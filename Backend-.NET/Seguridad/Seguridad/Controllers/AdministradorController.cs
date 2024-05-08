using ReglasNegocio;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Seguridad.Controllers
{
    [ApiController]
    [Route("[controller]")]//Ensablado de clase
    public class AdministradorController : ControllerBase
    {
        private readonly AdministradorReglasNegocio _admnistradorDatos;
        public AdministradorController(IConfiguration configuration, AdministradorReglasNegocio admnistradorDatos)
        {
            _admnistradorDatos = admnistradorDatos;
        }
        [HttpGet]
        public IActionResult ObtenerNombreAdministrador(string nombreUsuario, string contrasena) {
           
            return Ok(JsonConvert.SerializeObject(_admnistradorDatos.ObtenerNombreAdministrador(nombreUsuario, contrasena)));
        }
    }
}
