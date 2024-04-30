using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Datos;
using Dominio;

namespace ReglasNegocio
{
    public class ReservaReglasNegocio
    {
        private ReservaDatos datos;

        public ReservaReglasNegocio()
        {
            datos = new ReservaDatos();
        }

        public List<Reserva> obtenerReservas() { 
            return this.datos.obtenerReservas();
        }

        public bool agregarReserva(Reserva reserva) 
        {
            return this.datos.agregarReserva(reserva);
        }
    }
}
