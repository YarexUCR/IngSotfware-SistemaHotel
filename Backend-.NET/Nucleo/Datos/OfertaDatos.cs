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
    public class OfertaDatos
    {
        private readonly string _connectionString;
        public OfertaDatos(IConfiguration configuration)
        {

            _connectionString = configuration.GetConnectionString("HotelPalmConexion");

        }


        public async Task<List<Oferta>> getAllOfertas()
        {

            List<Oferta> ofertas = new List<Oferta>();
            List<TipoHabitacion> TipoHabitacion = new List<TipoHabitacion>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("ObtenerHabitacionesDisponiblesParaReserva", connection))
                {
                    

                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Oferta oferta  = new Oferta
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Nombre = Convert.ToString(reader["nombre"]),
                            Descuento = Convert.ToInt32(reader["descuento"]),
                            //FechaInicio = Convert.ToDateTime(reader["fechaInicio"]),
                           // FechaFin = Convert.ToDateTime(reader["fechaFin"]),
//Activo = Convert.ToBoolean(reader["activo"])
                            // Mapea otros campos según tu estructura de datos
                        };


                        ofertas.Add(oferta);
                    }

                    reader.Close();
                }
            }

            return ofertas;
        }

        public async Task<List<TipoHabitacion>> getTipoDeHabitcion(int id) {

            List<TipoHabitacion> TipoHabitacion = new List<TipoHabitacion>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("BuscarTipoHabitacionPorOferta", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@checkIn", id);
                   

                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        TipoHabitacion tipoHabitacion = new TipoHabitacion
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Nombre = Convert.ToString(reader["descripcion"]),
                        
                        };

                        TipoHabitacion.Add(tipoHabitacion);
                    }

                    reader.Close();
                }
            }

            return TipoHabitacion;
        }
      



    }
}
