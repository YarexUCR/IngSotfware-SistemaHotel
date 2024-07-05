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
    public class PublicidadReglaDeNegocio
    {
        private PublicidadDatos datos;

        public PublicidadReglaDeNegocio(IConfiguration configuration)
        {
            datos = new PublicidadDatos(configuration);
        }

        public bool InsertarPublicidad(Publicidad publicidad) {
            return datos.InsertarPublicidad(publicidad);
        }

        public List<Publicidad> ObtenerTodasPublicidad() { 
            return datos.ObtenerTodasPublicidad();
        }

        public bool EliminarPublicidad(int id) {
            return datos.EliminarPublicidad(id);
        }
    }
}
