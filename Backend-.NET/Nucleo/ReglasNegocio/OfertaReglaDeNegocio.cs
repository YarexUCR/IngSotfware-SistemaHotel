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



        public async Task<bool> updateOferta(Oferta oferta)
        {
            return await datos.updateOferta(oferta);
        }


        public async Task<bool> deleteOferta(int id)
        {
            return await datos.deleteOferta(id);
        }

        public async Task<Oferta> getOferta(int id)
        {
            return await datos.getOferta(id);
        }

      
    }
}
