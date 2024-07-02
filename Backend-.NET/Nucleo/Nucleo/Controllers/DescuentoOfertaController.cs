using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReglasNegocio;

namespace Nucleo.Controllers
{
    
    [ApiController]
    [Route("[controller]")]//Ensablado de clase
    public class DescuentoOfertaController : ControllerBase
    {
        private readonly DescuentoOfertaReglaDeNegocio _reglasNegocio;
        public DescuentoOfertaController(IConfiguration configuration, DescuentoOfertaReglaDeNegocio reglasNegocio)
        {
            _reglasNegocio = reglasNegocio;
        }

        [HttpGet("ObtenerDescuentoOferta")]//para calcular el total
        public IActionResult ObtenerDescuentoOferta(DateTime fecha, int idTipoHabitacion) {
            return Ok(this._reglasNegocio.ObtenerDescuentoOferta(fecha, idTipoHabitacion));
        }

        [HttpGet("ObtenerTodasOfertas")]//para tarifas
        public IActionResult ObtenerTodasOfertas() {
            return Ok(this._reglasNegocio.ObtenerTodasOfertas());
        }
    }
}
