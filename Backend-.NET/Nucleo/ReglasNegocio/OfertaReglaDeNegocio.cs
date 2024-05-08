using Datos;
using Dominio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReglasNegocio
{
    public class OfertaReglaDeNegocio
    {
       private readonly OfertaDatos datos;
        public OfertaReglaDeNegocio(OfertaDatos datos)
        {
            this.datos = datos;
        }

        public async Task<List<Oferta>> getAllOfertas()
        {
           
            return await datos.getAllOfertas();
        }
        public async Task<bool> agregarOferta(Oferta oferta)
        {
            return await datos.agregarOferta(oferta);
        }

      
    }
}
