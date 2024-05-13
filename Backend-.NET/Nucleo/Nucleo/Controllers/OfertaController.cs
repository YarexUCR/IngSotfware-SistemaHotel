using Dominio;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReglasNegocio;

namespace Nucleo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfertaController : ControllerBase
    {
        private readonly OfertaReglaDeNegocio _ofertaReglaDeNegocio;

        public OfertaController(OfertaReglaDeNegocio ofertaReglaDeNegocio)
        {
            _ofertaReglaDeNegocio = ofertaReglaDeNegocio;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Oferta>>> GetOfertas()
        {
            return await _ofertaReglaDeNegocio.getAllOfertas();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Oferta>> GetOferta(int id)
        {
            var oferta = await _ofertaReglaDeNegocio.getOferta(id);

            if (oferta == null)
            {
                return NotFound();
            }

            return oferta;
           
    }
         
  
        [HttpPost]
        public async Task<bool> PostOferta(Oferta oferta)
        {
            await _ofertaReglaDeNegocio.agregarOferta(oferta);

            return await _ofertaReglaDeNegocio.agregarOferta(oferta);
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteOferta(int id)
        {


            return await _ofertaReglaDeNegocio.deleteOferta(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> PutOferta(int id, Oferta oferta)
        {
            if (id != oferta.Id)
            {
                return BadRequest();
            }

            return await _ofertaReglaDeNegocio.updateOferta(oferta);
        }

       
    }
}
