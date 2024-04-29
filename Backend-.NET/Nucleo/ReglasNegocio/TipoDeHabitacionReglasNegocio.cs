﻿namespace ReglasNegocio
{
    using Datos;
    using Dominio;
    using Microsoft.Extensions.Configuration;

    public class TipoDeHabitacionReglasNegocio
    {

        private TipoHabitacionDatos datos;

        public TipoDeHabitacionReglasNegocio(IConfiguration configuration) { 
            datos = new TipoHabitacionDatos(configuration);
        }

        public List<TipoHabitacion> obtenerTipoHabitaciones() {
            return this.datos.obtenerTipoHabitacion();
        }

        public Dictionary<string, int> ObtenerCantidadHabitacionesDisponibles(DateTime fechaInicio, DateTime fechaFin) {
            return this.datos.ObtenerCantidadHabitacionesDisponibles(fechaInicio, fechaFin);
        }

        public int ObtenerCantidadHabitacionesDisponiblesPorDiaTipo(DateTime fecha, int tipoHabitacionId) {
            return this.datos.ObtenerCantidadHabitacionesDisponiblesPorDiaTipo(fecha,tipoHabitacionId);
        }
    }
}