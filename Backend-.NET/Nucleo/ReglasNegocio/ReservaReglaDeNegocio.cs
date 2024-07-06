using Datos;
using Dominio;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReglasNegocio
{
    public class ReservaReglaDeNegocio
    {
        private readonly ReservaData _reservaDatos;

        public ReservaReglaDeNegocio(ReservaData reservaDatos)
        {
            _reservaDatos = reservaDatos;
        }

        public async Task<List<Habitacion>> ObtenerHabitacionesPorReservaAsync(int reservaId)
        {
            return await _reservaDatos.ObtenerHabitacionesPorReservaAsync(reservaId);
        }

        public async Task<List<Reserva>> ObtenerReservasAsync(string cliente)
        {
            return await _reservaDatos.ObtenerReservasAsync(cliente);
        }

        public async Task<List<Reserva>> ObtenerReservaAsync()
        {
            return await _reservaDatos.ObtenerReservaAsync();
        }


        public async Task<bool> ActualizarBorradoLogicoReservaAsync(int reservaId)
        {
            return await _reservaDatos.ActualizarBorradoLogicoReservaAsync(reservaId);
        }
    }
}
