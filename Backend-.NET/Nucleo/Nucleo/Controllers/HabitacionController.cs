using Dominio;
using Microsoft.AspNetCore.Mvc;
using ReglasNegocio;

namespace Nucleo.Controllers
{
    [ApiController]
    [Route("[controller]")]//Ensablado de clase
    public class HabitacionController : ControllerBase
    {
        private readonly HabitacionReglasNegocio _reglasNegocio;
        public HabitacionController(IConfiguration configuration, HabitacionReglasNegocio reglasNegocio)
        {
            _reglasNegocio = reglasNegocio;
        }

        [HttpGet]
        public IActionResult ObtenerHabitacionesDisponiblesParaReserva(DateTime checkIn, DateTime checkOut, int tipoHabitacion) {
            return Ok(_reglasNegocio.ObtenerHabitacionesDisponiblesParaReserva(checkIn,checkOut,tipoHabitacion));
        }

        [HttpGet("verificar")]
        public async Task<List<Habitacion>> VerificarDisponibilidad(string check)
        {
            return await _reglasNegocio.VerificarDisponibilidad(check);
        }

    }
}
