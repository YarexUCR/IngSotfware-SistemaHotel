using Dominio;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ReglasNegocio;

namespace Nucleo.Controllers
{
    [ApiController]
    [Route("[controller]")]//Ensablado de clase
    public class ReservaController : ControllerBase
    {
        private readonly ReservaReglasNegocio _reglasNegocio;
        public ReservaController(IConfiguration configuration, ReservaReglasNegocio reglasNegocio)
        {
            _reglasNegocio = reglasNegocio;
        }


        [HttpPost]
        public IActionResult InsertarReserva([FromBody] Reserva reserva)
        {   
            return Ok(_reglasNegocio.InsertarReserva(reserva));
        }
    }
}
