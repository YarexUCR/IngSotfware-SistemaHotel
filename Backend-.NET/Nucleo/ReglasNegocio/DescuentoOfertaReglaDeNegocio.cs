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
    public  class DescuentoOfertaReglaDeNegocio
    {
        private DescuentoOfertaDatos datos;

        public DescuentoOfertaReglaDeNegocio(IConfiguration configuration)
        {
            datos = new DescuentoOfertaDatos(configuration);
        }

        public List<DescuentoOferta> ObtenerDescuentoOferta(DateTime fecha, int idTipoHabitacion) { 
            return this.datos.ObtenerDescuentoOferta(fecha,idTipoHabitacion);
        }

        public List<DescuentoOferta> ObtenerTodasOfertas() { 
            return this.datos.ObtenerTodasOfertas();
        }
    }
}
