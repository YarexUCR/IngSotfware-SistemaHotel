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
            return Ok(_reglasNegocio.ObtenerCantidadHabitacionesDisponibles(fechaInicio, fechaFin));
        }

        [HttpGet("ObtenerCantidadHabitacionesDisponiblesPorDiaTipo")]
        public IActionResult ObtenerCantidadHabitacionesDisponiblesPorDiaTipo(DateTime fecha, int tipoHabitacionId) {
            return Ok(_reglasNegocio.ObtenerCantidadHabitacionesDisponiblesPorDiaTipo(fecha, tipoHabitacionId));
        }
        [HttpGet("ObtenerHabitacionesDisponiblesParaReserva")]
        public IActionResult ObtenerHabitacionesDisponiblesParaReserva(DateTime checkIn, DateTime checkOut, int tipoHabitacion) {
            return Ok(_reglasNegocio.ObtenerHabitacionesDisponiblesParaReserva(checkIn, checkOut, tipoHabitacion));
        }

        [HttpGet("ObtenerTodasHabitacionesDisponiblesParaReserva")]
        public IActionResult ObtenerTodasHabitacionesDisponiblesParaReserva(DateTime checkIn, DateTime checkOut)
        {
            return Ok(_reglasNegocio.ObtenerTodasHabitacionesDisponiblesParaReserva(checkIn, checkOut));
        }

        [HttpGet("ObtenerTodasHabitaciones")]
        public IActionResult ObtenerTodasHabitaciones() {
            return Ok(_reglasNegocio.ObtenerTodasHabitaciones());
        }

        [HttpPost("ActualizarTipoHabitacion")]
        public IActionResult ActualizarTipoHabitacion(TipoHabitacion tipo) {
            return Ok(_reglasNegocio.ActualizarTipoHabitacion(tipo));

        }

        [HttpPut("ActualizarEstadoHabitacion/{id}/{activo}")]
        public IActionResult ActualizarEstadoHabitacion(int id, bool activo) { 
            return Ok(_reglasNegocio.ActualizarEstadoHabitacion(id,activo));
        }

        [HttpPost("CargarImagenHabitacion")]
        public async Task<IActionResult> CargarImagenHabitacion(IFormFile file, int hotel_id)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No se guardó el archivo.");
            }

            // Validar que el archivo sea una imagen
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (string.IsNullOrEmpty(extension) || !allowedExtensions.Contains(extension))
            {
                return BadRequest("El archivo subido no es una imagen válida.");
            }

            // Ruta donde se guardará el archivo en wwwroot/imagenes
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imagenes/habitacion");
            var filePath = Path.Combine(folderPath, file.FileName);

            // Crear el directorio si no existe
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Devolver la URL del archivo guardado
            var fileUrl = $"{Request.Scheme}://{Request.Host}/imagenes/habitacion/{file.FileName}";

            return Ok(new { Url = fileUrl });
        }
    }
}
