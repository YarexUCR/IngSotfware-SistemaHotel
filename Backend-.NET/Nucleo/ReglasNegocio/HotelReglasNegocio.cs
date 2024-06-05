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
    public  class HotelReglasNegocio
    {
        private HotelDatos datos;

        public HotelReglasNegocio(IConfiguration configuration)
        {
            datos = new HotelDatos(configuration);
        }

        public bool ActualizarHome(Hotel hotel) { 
            return datos.ActualizarHome(hotel);
        }

        public Hotel ObtenerHome(int id) {
            return datos.ObtenerHome(id);
        }

        public Hotel ObtenerComoLlegar(int id) {
            return datos.ObtenerComoLlegar(id);
        }

        public bool ActualizarComoLlegar(Hotel hotel) {
            return datos.ActualizarComoLlegar(hotel);
        }

        public Hotel ObtenerSobreNosotros(int id) { 
            return datos.ObtenerSobreNosotros(id);
        }

        public bool ActualizarSobreNosotros(Hotel hotel) {
            return datos.ActualizarSobreNosotros(hotel);
        }

        public Hotel ObtenerFacilidades(int id) {
            return datos.ObtenerFacilidades(id);
        }

        public bool ActualizarFacilidades(Hotel hotel) {
            return datos.ActualizarFacilidades(hotel);
        }
    }
}
