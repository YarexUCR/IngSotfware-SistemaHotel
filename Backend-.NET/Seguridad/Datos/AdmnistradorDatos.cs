using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace Datos
{
    public class AdmnistradorDatos
    {
        private readonly string _connectionString;
        public AdmnistradorDatos(IConfiguration configuration)
        {

            _connectionString = configuration.GetConnectionString("SeguridadHotelPalmConexion");

        }
        public string ObtenerNombreAdministrador(string nombreUsuario, string contrasena)
        {
            string nombreAdministrador = string.Empty;

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("login", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Agregar parámetros al comando
                    command.Parameters.AddWithValue("@nombreUsuario", nombreUsuario);
                    command.Parameters.AddWithValue("@contrasena", contrasena);

                    connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            // Obtener el nombre del administrador si hay resultados
                            nombreAdministrador = reader["nombre"].ToString();
                        }
                    }
                }
            }

            return nombreAdministrador;
        }
    }
}