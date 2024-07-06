using Dominio;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Datos
{
    public class ReservaData
    {
        private readonly string _connectionString;

        public ReservaData(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("HotelPalmConexion");
        }

        public async Task<List<Habitacion>> ObtenerHabitacionesPorReservaAsync(int reservaId)
        {
            List<Habitacion> habitaciones = new List<Habitacion>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("sp_obtenerHabitacionesPorReserva", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@reservaId", reservaId);

                    await connection.OpenAsync();
                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            Habitacion habitacion = new Habitacion
                            {
                                Numero = Convert.ToInt32(reader["numero"]),
                                Tipo = new TipoHabitacion
                                {
                                    Nombre = reader["nombre"].ToString()
                                }
                            };
                            habitaciones.Add(habitacion);
                        }
                    }
                }
            }

            return habitaciones;
        }

        public async Task<List<Reserva>> ObtenerReservasAsync(string cliente)
        {
            List<Reserva> reservas = new List<Reserva>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("sp_obtenerReservasFiltro", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    if (cliente != null)
                    {
                        command.Parameters.AddWithValue("@filtro", cliente);
                    }

                    await connection.OpenAsync();
                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            Reserva reserva = new Reserva
                            {
                                Id = Convert.ToInt32(reader["id"]),
                                Cliente = reader["cliente"].ToString(),
                                Cedula = reader["cedula"].ToString(),
                                Total = Convert.ToInt32(reader["total"]),
                                Email = reader["email"].ToString(),
                                CheckIn = Convert.ToDateTime(reader["checkIn"]),
                                CheckOut = Convert.ToDateTime(reader["checkOut"]),
                                Habitaciones = await ObtenerHabitacionesPorReservaAsync(Convert.ToInt32(reader["id"]))
                            };
                            reservas.Add(reserva);
                        }
                    }
                }
            }

            return reservas;
        }
        public async Task<List<Reserva>> ObtenerReservaAsync()
        {
            List<Reserva> reservas = new List<Reserva>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("sp_obtenerReservas", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    await connection.OpenAsync();
                    SqlDataReader reader = await command.ExecuteReaderAsync();

                    while (await reader.ReadAsync())
                    {
                        Reserva reserva = new Reserva
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Cliente = reader["cliente"].ToString(),
                            Cedula = reader["cedula"].ToString(),
                            Total = Convert.ToInt32(reader["total"]),
                            Email = reader["email"].ToString(),
                            CheckIn = Convert.ToDateTime(reader["checkIn"]),
                            CheckOut = Convert.ToDateTime(reader["checkOut"]),
                            Habitaciones = await ObtenerHabitacionesPorReservaAsync(Convert.ToInt32(reader["id"]))
                        };
                        Console.WriteLine(reserva.id);
                        reservas.Add(reserva);
                    }

                    await reader.CloseAsync();
                }
            }

            return reservas;
        }


        public async Task<bool> ActualizarBorradoLogicoReservaAsync(int reservaId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (SqlCommand command = new SqlCommand("sp_ActualizarBorradoLogicoReserva", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add("@reservaId", SqlDbType.Int).Value = reservaId;

                    int rowsAffected = await command.ExecuteNonQueryAsync();

                    return rowsAffected > 0;
                }
            }
        }
    }
}
