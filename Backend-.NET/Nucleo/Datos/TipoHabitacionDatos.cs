using Dominio;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Datos
{
    public class TipoHabitacionDatos
    {
      
        private readonly string _connectionString;
        public TipoHabitacionDatos(IConfiguration configuration) {

            _connectionString = configuration.GetConnectionString("HotelPalmConexion");

        }

        public List<TipoHabitacion> obtenerTipoHabitacion()
        {
            List<TipoHabitacion> listaTipoHabitacion = new List<TipoHabitacion>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("ObtenerTipoHabitacion", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        TipoHabitacion tipoHabitacion = new TipoHabitacion
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Descripcion = reader["descripcion"].ToString(),
                            Precio = (double)Convert.ToDecimal(reader["precio"]),
                            Imagen = reader["imagen"].ToString(),
                            Cantidad = 5,
                            Nombre = reader["nombre"].ToString()
                        };

                        listaTipoHabitacion.Add(tipoHabitacion);
                    }

                    reader.Close();
                }
            }

            return listaTipoHabitacion;
        }

        public Dictionary<string, int> ObtenerCantidadHabitacionesDisponibles(DateTime fechaInicio, DateTime fechaFin)
        {
            Dictionary<string, int> cantidadPorTipo = new Dictionary<string, int>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("ObtenerCantidadHabitacionesDisponibles", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@fechaInicio", fechaInicio);
                    command.Parameters.AddWithValue("@fechaFin", fechaFin);

                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        string nombreTipoHabitacion = reader["NombreTipoHabitacion"].ToString();
                        int cantidadDisponible = Convert.ToInt32(reader["CantidadDisponible"]);

                        cantidadPorTipo.Add(nombreTipoHabitacion, cantidadDisponible);
                    }

                    reader.Close();
                }
            }

            return cantidadPorTipo;
        }

        public int ObtenerCantidadHabitacionesDisponiblesPorDiaTipo(DateTime fecha, int tipoHabitacionId)
        {
            int cantidadDisponible = 0;

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("ObtenerCantidadHabitacionesDisponiblesPorDiaTipo", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@fecha", fecha);
                    command.Parameters.AddWithValue("@tipoHabitacionId", tipoHabitacionId);

                    connection.Open();
                    cantidadDisponible = (int)command.ExecuteScalar();
                }
            }

            return cantidadDisponible;
        }
    }
}