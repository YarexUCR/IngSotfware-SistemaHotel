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

        public List<Habitacion> ObtenerTodasHabitacionesDisponiblesParaReserva(DateTime checkIn, DateTime checkOut)
        {
            List<Habitacion> habitacionesDisponibles = new List<Habitacion>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("ObtenerTodasHabitacionesDisponiblesParaReserva", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@checkIn", checkIn);
                    command.Parameters.AddWithValue("@checkOut", checkOut);

                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                   
                    while (reader.Read())
                    {
                        Habitacion habitacion = new Habitacion
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Numero = Convert.ToInt32(reader["numero"]),
                            Activo = Convert.ToBoolean(reader["activo"])
                            // Mapea otros campos según tu estructura de datos
                        };
                        habitacion.tipo = this.ObtenerTipoHabitacionPorId(Convert.ToInt32(reader["tipoHabitacionId"]));
                        habitacionesDisponibles.Add(habitacion);
                    }

                    reader.Close();
                }
            }

            return habitacionesDisponibles;
        }

        public List<Habitacion> ObtenerHabitacionesDisponiblesParaReserva(DateTime checkIn, DateTime checkOut, int tipoHabitacion)
        {
            List<Habitacion> habitacionesDisponibles = new List<Habitacion>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("ObtenerHabitacionesDisponiblesParaReserva", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@checkIn", checkIn);
                    command.Parameters.AddWithValue("@checkOut", checkOut);
                    command.Parameters.AddWithValue("@tipoHabitacion", tipoHabitacion);

                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    TipoHabitacion tipo =this.ObtenerTipoHabitacionPorId(tipoHabitacion);
                    while (reader.Read())
                    {
                        Habitacion habitacion = new Habitacion
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Numero = Convert.ToInt32(reader["numero"]),
                            Activo = Convert.ToBoolean(reader["activo"])
                            // Mapea otros campos según tu estructura de datos
                        };
                        habitacion.tipo = tipo;
                        habitacionesDisponibles.Add(habitacion);
                    }

                    reader.Close();
                }
            }

            return habitacionesDisponibles;
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
                            Cantidad = 0,
                            Nombre = reader["nombre"].ToString()
                        };

                        listaTipoHabitacion.Add(tipoHabitacion);
                    }

                    reader.Close();
                }
            }

            return listaTipoHabitacion;
        }

        public List<HabitacionesDisponibles> ObtenerCantidadHabitacionesDisponibles(DateTime fechaInicio, DateTime fechaFin)
        {
            List<HabitacionesDisponibles> habitaciones = new List<HabitacionesDisponibles>();

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
                        string tipo = reader["NombreTipoHabitacion"].ToString();
                        int  cantidad = Convert.ToInt32(reader["CantidadDisponible"]);
                        HabitacionesDisponibles habitacionDisponible = new HabitacionesDisponibles();
                        habitacionDisponible.Tipo = tipo;
                        habitacionDisponible.Cantidad = cantidad;

                        habitaciones.Add(habitacionDisponible);
                    }

                    reader.Close();
                }
            }

            return habitaciones;
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

        // Método para obtener el tipo de habitación por ID
        public TipoHabitacion ObtenerTipoHabitacionPorId(int tipoId)
        {
            TipoHabitacion tipoHabitacion = null;

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("ObtenerTipoHabitacionId", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@id", tipoId);

                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.Read())
                    {
                        tipoHabitacion = new TipoHabitacion
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Descripcion = reader["descripcion"].ToString(),
                            Precio = Convert.ToDouble(reader["precio"]),
                            Imagen = reader["imagen"].ToString(),
                            Cantidad = 0, // Aquí puedes ajustar según tus necesidades
                            Nombre = reader["nombre"].ToString()
                        };
                    }

                    reader.Close();
                }
            }

            return tipoHabitacion;
        }

        public List<Habitacion> ObtenerTodasHabitaciones()
        {
            List<Habitacion> habitacionesDisponibles = new List<Habitacion>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("ObtenerTodasHabitaciones", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Habitacion habitacion = new Habitacion
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Numero = Convert.ToInt32(reader["numero"]),
                            Activo = Convert.ToBoolean(reader["activo"])
                            // Mapea otros campos según tu estructura de datos
                        };
                        habitacion.tipo = this.ObtenerTipoHabitacionPorId(Convert.ToInt32(reader["tipoHabitacionId"]));
                        habitacionesDisponibles.Add(habitacion);
                    }

                    reader.Close();
                }
            }

            return habitacionesDisponibles;
        }

        public bool ActualizarTipoHabitacion(TipoHabitacion tipo)
        {
            bool cambiosRealizados = false;

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("ActualizarTipoHabitacion", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@id", tipo.Id);
                    command.Parameters.AddWithValue("@descripcion", tipo.Descripcion);
                    command.Parameters.AddWithValue("@precio", tipo.Precio);
                    command.Parameters.AddWithValue("@imagen", tipo.Imagen);
                    command.Parameters.AddWithValue("@nombre", tipo.Nombre);

                    connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();

                    cambiosRealizados = rowsAffected > 0;

                }
            }
            return cambiosRealizados;
        }

    }
}