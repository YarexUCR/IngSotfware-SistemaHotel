using Dominio;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos
{
    public class OfertaDatos
    {
        private readonly string _connectionString;
        public OfertaDatos(IConfiguration configuration)
        {

            _connectionString = configuration.GetConnectionString("HotelPalmConexion");

        }


        public async Task<List<Oferta>> getAllOfertas()
        {


            return new List<Oferta>();
        }



    }
}
