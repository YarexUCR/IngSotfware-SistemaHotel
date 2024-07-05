using Datos;
using Dominio;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReglasNegocio
{
    public class TemporadaReglaDeNegocio
    {
        private readonly TemporadaDatos _datos;

        public TemporadaReglaDeNegocio(TemporadaDatos datos)
        {
            _datos = datos;
        }

        public async Task<List<Temporada>> GetAllTemporadasAsync()
        {
            return await _datos.GetAllTemporadasAsync();
        }

        public async Task<Temporada> GetTemporadaByDateAsync(DateTime fecha)
        {
            return await _datos.GetTemporadaByDateAsync(fecha);
        }

        public async Task<bool> AgregarTemporadaAsync(Temporada temporada)
        {
            // Aquí puedes añadir reglas de negocio específicas antes de insertar
            // Ejemplo: validar que las fechas no estén dentro del rango de otra temporada existente
            var temporadas = await _datos.GetAllTemporadasAsync();
            foreach (var temp in temporadas)
            {
                if ((temporada.FechaInicio >= temp.FechaInicio && temporada.FechaInicio <= temp.FechaFinal) ||
                    (temporada.FechaFinal >= temp.FechaInicio && temporada.FechaFinal <= temp.FechaFinal))
                {
                    throw new Exception("Las fechas de la nueva temporada no pueden estar dentro del rango de otra temporada existente.");
                }
            }

            return await _datos.CreateTemporadaAsync(temporada);
        }

        public async Task<bool> UpdateTemporadaAsync(Temporada temporada)
        {
            // Aquí puedes añadir reglas de negocio específicas antes de actualizar
            // Ejemplo: validar que las fechas no estén dentro del rango de otra temporada existente
            var temporadas = await _datos.GetAllTemporadasAsync();
            foreach (var temp in temporadas)
            {
                if (temp.ID_Temporada != temporada.ID_Temporada)
                {
                    if ((temporada.FechaInicio >= temp.FechaInicio && temporada.FechaInicio <= temp.FechaFinal) ||
                        (temporada.FechaFinal >= temp.FechaInicio && temporada.FechaFinal <= temp.FechaFinal))
                    {
                        throw new Exception("Las fechas de la temporada actualizada no pueden estar dentro del rango de otra temporada existente.");
                    }
                }
            }

            return await _datos.UpdateTemporadaAsync(temporada);
        }

        public async Task<bool> DeleteTemporadaAsync(int id)
        {
            return await _datos.DeleteTemporadaAsync(id);
        }
    }
}
