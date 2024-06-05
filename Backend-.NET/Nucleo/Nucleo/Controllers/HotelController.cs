using Dominio;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ReglasNegocio;

namespace Nucleo.Controllers
{
    [ApiController]
        [Route("[controller]")]//Ensablado de clase
    public class HotelController : ControllerBase
    {
        
        private readonly HotelReglasNegocio _reglasNegocio;
        public HotelController(IConfiguration configuration, HotelReglasNegocio reglasNegocio)
        {
            _reglasNegocio = reglasNegocio;
        }

        [HttpPost("ActualizarHome")]
        public IActionResult ActualizarHome(Hotel hotel)
        {
            return Ok(_reglasNegocio.ActualizarHome(hotel));
        }

        [HttpGet("ObtenerHome")]
        public IActionResult ObtenerHome(int id) {
            return Ok(_reglasNegocio.ObtenerHome(id));
        }

        [HttpGet("ObtenerComoLlegar")]
        public IActionResult ObtenerComoLlegar(int id) {
            return Ok(_reglasNegocio.ObtenerComoLlegar(id));
        }

        [HttpPost("ActualizarComoLlegar")]
        public IActionResult ActualizarComoLlegar(Hotel hotel) {
            return Ok(_reglasNegocio.ActualizarComoLlegar(hotel));
        }

        [HttpGet("ObtenerSobreNosotros")]
        public IActionResult ObtenerSobreNosotros(int id) {
            return Ok(_reglasNegocio.ObtenerSobreNosotros(id));
        }

        [HttpPost("ActualizarSobreNosotros")]
        public IActionResult ActualizarSobreNosotros(Hotel hotel) {
            return Ok(_reglasNegocio.ActualizarSobreNosotros(hotel));
        }

        [HttpGet("ObtenerFacilidades")]
        public IActionResult ObtenerFacilidades(int id) {
            return Ok(_reglasNegocio.ObtenerFacilidades(id));
        }

        [HttpPost("ActualizarFacilidades")]
        public IActionResult ActualizarFacilidades(Hotel hotel) {
            return Ok(_reglasNegocio.ActualizarFacilidades(hotel));
        }
    }
}
