using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Nucleo.Controllers
{
    [ApiController]
    [Route("[controller]")]//Ensablado de clase
    public class PublicidadController : ControllerBase
    {
        [HttpPost("CrearPublicidad")]
        public async Task<IActionResult> CrearPublicidad(IFormFile file, string enlace, string nombre)
        {
            Console.WriteLine("enlace " + enlace);
            Console.WriteLine("nombre" + nombre);
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
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imagenes/publicidad");
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
            var fileUrl = $"{Request.Scheme}://{Request.Host}/imagenes/publicidad/{file.FileName}";

            return Ok(new { Url = fileUrl });
        }
    }
}
