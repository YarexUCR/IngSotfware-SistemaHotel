using Dominio;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos
{
    public class ReservaDatos
    {

        private readonly string _connectionString;
        public ReservaDatos(IConfiguration configuration)
        {

            _connectionString = configuration.GetConnectionString("HotelPalmConexion");

        }

        public bool InsertarReserva(Reserva reserva)
        {
            bool insertado = false;
            int idReserva = 0; // Variable para almacenar el ID de la reserva insertada

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("InsertarReserva", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Agregar parámetros al procedimiento almacenado
                    command.Parameters.AddWithValue("@cliente", reserva.Cliente);
                    command.Parameters.AddWithValue("@cedula", reserva.Cedula);
                    command.Parameters.AddWithValue("@total", reserva.Total);
                    command.Parameters.AddWithValue("@email", reserva.Email);
                    command.Parameters.AddWithValue("@checkIn", reserva.CheckIn);
                    command.Parameters.AddWithValue("@checkOut", reserva.CheckOut);

                    

                    try
                    {
                        connection.Open();
                        SqlDataReader reader = command.ExecuteReader();
                        insertado = true;

                        if (reader.HasRows)
                        {
                            reader.Read();
                            idReserva = Convert.ToInt32(reader["IdReserva"]);

                            foreach (Habitacion habitacion in reserva.habitaciones) {
                                this.InsertarReservaHabitacion(idReserva,habitacion.id,habitacion.tipo.Precio);
                            }
                            
                        }

                        reader.Close();
                    }
                    catch (Exception ex)
                    {
                        // Manejar excepciones (por ejemplo, loguear el error)
                        // En caso de error, 'idReserva' seguirá siendo 0
                    }
                }
            }

            return insertado;
        }

        public bool InsertarReservaHabitacion(int reservaId, int habitacionId, double precio)
        {
            bool insertado = false;

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("InsertarReservaHabitacion", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Agregar parámetros al procedimiento almacenado
                    command.Parameters.AddWithValue("@reservaId", reservaId);
                    command.Parameters.AddWithValue("@habitacionId", habitacionId);
                    command.Parameters.AddWithValue("@precio", precio);

                    try
                    {
                        connection.Open();
                        command.ExecuteNonQuery();
                        insertado = true;
                    }
                    catch (Exception ex)
                    {
                        // Manejar excepciones (por ejemplo, loguear el error)
                    }
                }
            }

            return insertado;
        }

    }
}
