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

                    // Agregar parámetro de retorno para obtener el ID de la reserva insertada
                    SqlParameter idReservaParam = new SqlParameter("@IdReserva", SqlDbType.Int);
                    idReservaParam.Direction = ParameterDirection.Output;
                    command.Parameters.Add(idReservaParam);

                    try
                    {
                        connection.Open();
                        command.ExecuteNonQuery();
                        idReserva = Convert.ToInt32(command.Parameters["@IdReserva"].Value);
                        // La reserva se insertó correctamente, y 'idReserva' contiene el ID insertado
                        insertado = true;
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

    }
}
