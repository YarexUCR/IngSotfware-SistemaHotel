using Dominio;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ReglasNegocio;
using System;

namespace Nucleo.Controllers
{
    [ApiController]
        [Route("[controller]")]//Ensablado de clase
    public class HotelController : ControllerBase
    {
        

        private readonly HotelReglasNegocio _reglasNegocio;
        private string console;

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

        
        [HttpPost("CargarImagenHome")]
        public async Task<IActionResult> CargarImagenHome(IFormFile file, int hotel_id)
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
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imagenes/home");
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
            var fileUrl = $"{Request.Scheme}://{Request.Host}/imagenes/home/{file.FileName}";
         
            

            this._reglasNegocio.ActualizarImagenHome(fileUrl);

            return Ok(new { Url = fileUrl });
        }

        [HttpGet("ObtenerImagenHome")]
        public IActionResult ObtenerImagenHome(int id)
        {
            return Ok(_reglasNegocio.ObtenerImagenHome(id));
        }
    }
}
