using Microsoft.Extensions.Configuration;
using Datos;

namespace ReglasNegocio
{
    public class AdministradorReglasNegocio
    {
        private AdmnistradorDatos datos;

        public AdministradorReglasNegocio(IConfiguration configuration)
        {
            datos = new AdmnistradorDatos(configuration);
        }

        public string ObtenerNombreAdministrador(string nombreUsuario, string contrasena) {
            return datos.ObtenerNombreAdministrador( nombreUsuario,  contrasena);
        }
    }
}