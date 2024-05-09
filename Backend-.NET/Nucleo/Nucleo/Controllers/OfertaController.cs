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
        /*
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
         */
        /*
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOferta(int id, Oferta oferta)
        {
            if (id != oferta.Id)
            {
                return BadRequest();
            }

            try
            {
                await _ofertaReglaDeNegocio.updateOferta(oferta);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OfertaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        */
        [HttpPost]
        public async Task<bool> PostOferta(Oferta oferta)
        {
            await _ofertaReglaDeNegocio.agregarOferta(oferta);

            return await _ofertaReglaDeNegocio.agregarOferta(oferta);
        }
        /*
        [HttpDelete("{id}")]
        public async Task<ActionResult<Oferta>> DeleteOferta(int id)
        {
            var oferta = await _ofertaReglaDeNegocio.getOferta(id);
            if (oferta == null)
            {
                return NotFound();
            }

            await _ofertaReglaDeNegocio.deleteOferta(oferta);

            return oferta;
        }

        private bool OfertaExists(int id)
        {
            return _ofertaReglaDeNegocio.getOferta(id) != null;
        }
        */
    }
}
