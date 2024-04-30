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
        ReservaReglasNegocio reglasNegocio;
        List<Reserva> reservas;
        public ReservaController() { 
            this.reglasNegocio = new ReservaReglasNegocio();
            this.reservas = new List<Reserva>();
        }
        [HttpGet]
        public IActionResult obetenr()
        {
           
            return Ok(this.reservas);
        }

        [HttpPost]
        public IActionResult InsertarReserva([FromBody] Reserva reserva)
        {   
            this.reservas.Add(reserva);
            // Puedes retornar un mensaje de éxito u otro tipo de respuesta según tu necesidad
            return Ok(reserva);
        }
    }
}
