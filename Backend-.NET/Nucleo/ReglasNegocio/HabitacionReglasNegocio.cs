using Datos;
using Dominio;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReglasNegocio
{
    public class HabitacionReglasNegocio
    {
        private HabitacionDatos datos;

        public HabitacionReglasNegocio(IConfiguration configuration)
        {
            datos = new HabitacionDatos(configuration);
        }

        public List<Habitacion> ObtenerHabitacionesDisponiblesParaReserva(DateTime checkIn, DateTime checkOut, int tipoHabitacion) {
            return this.datos.ObtenerHabitacionesDisponiblesParaReserva(checkIn,checkOut,tipoHabitacion);
        }
    }
}
