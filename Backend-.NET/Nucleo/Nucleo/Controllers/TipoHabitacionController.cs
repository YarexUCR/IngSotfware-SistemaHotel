using Dominio;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using ReglasNegocio;

namespace Nucleo.Controllers
{
    [ApiController]
    [Route("[controller]")]//Ensablado de clase
    public class TipoHabitacionController : ControllerBase
    {
        private readonly TipoDeHabitacionReglasNegocio _reglasNegocio;
        public TipoHabitacionController(IConfiguration configuration, TipoDeHabitacionReglasNegocio reglasNegocio) {
            _reglasNegocio = reglasNegocio;
        }

        [HttpGet]
        public IActionResult obtenerTipoHabitaciones()
        { 
            return Ok(JsonConvert.SerializeObject(_reglasNegocio.obtenerTipoHabitaciones())); 
        }

        [HttpGet("ObtenerCantidadHabitacionesDisponibles")]
        public IActionResult ObtenerCantidadHabitacionesDisponibles(DateTime fechaInicio, DateTime fechaFin) {
            return Ok(_reglasNegocio.ObtenerCantidadHabitacionesDisponibles(fechaInicio,fechaFin));
        }

        [HttpGet("ObtenerCantidadHabitacionesDisponiblesPorDiaTipo")]
        public IActionResult ObtenerCantidadHabitacionesDisponiblesPorDiaTipo(DateTime fecha, int tipoHabitacionId) {
            return Ok(_reglasNegocio.ObtenerCantidadHabitacionesDisponiblesPorDiaTipo(fecha,tipoHabitacionId));
        }
        [HttpGet("ObtenerHabitacionesDisponiblesParaReserva")]
        public IActionResult ObtenerHabitacionesDisponiblesParaReserva(DateTime checkIn, DateTime checkOut, int tipoHabitacion) {
            return Ok(_reglasNegocio.ObtenerHabitacionesDisponiblesParaReserva(checkIn, checkOut,tipoHabitacion));
        }

        [HttpGet("ObtenerTodasHabitacionesDisponiblesParaReserva")]
        public IActionResult ObtenerTodasHabitacionesDisponiblesParaReserva(DateTime checkIn, DateTime checkOut)
        {
            return Ok(_reglasNegocio.ObtenerTodasHabitacionesDisponiblesParaReserva(checkIn,checkOut));
        }

        [HttpGet("ObtenerTodasHabitaciones")]
        public IActionResult ObtenerTodasHabitaciones() {
            return Ok(_reglasNegocio.ObtenerTodasHabitaciones());
        }
    }
}
