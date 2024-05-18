using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Datos;
using Dominio;
using Microsoft.Extensions.Configuration;

namespace ReglasNegocio
{
    public class ReservaReglasNegocio
    {
        private ReservaDatos datos;

        public ReservaReglasNegocio(IConfiguration configuration)
        {
            datos = new ReservaDatos(configuration);
        }

        public int InsertarReserva(Reserva reserva) {
            return this.datos.InsertarReserva(reserva);
        }
    }
}
