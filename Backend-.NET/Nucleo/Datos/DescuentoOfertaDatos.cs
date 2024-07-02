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
    public class DescuentoOfertaDatos
    {
        private readonly string _connectionString;
        public DescuentoOfertaDatos(IConfiguration configuration)
        {

            _connectionString = configuration.GetConnectionString("HotelPalmConexion");

        }

        public List<DescuentoOferta> ObtenerDescuentoOferta(DateTime fecha, int idTipoHabitacion)
        {
            List<DescuentoOferta> descuentos = new List<DescuentoOferta>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("[dbo].[sp_descuento_oferta]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parámetros del procedimiento almacenado
                    command.Parameters.Add(new SqlParameter("@fecha", fecha));
                    command.Parameters.Add(new SqlParameter("@idTipoHabitacion", idTipoHabitacion));

                    // Ejecutar el procedimiento almacenado
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            DescuentoOferta descuento = new DescuentoOferta
                            {
                                Nombre = reader["nombre"].ToString(),
                                Precio = Convert.ToDouble(reader["precio"]),
                                Descuento = Convert.ToInt32(reader["descuento"]),
                                MontoDescuento = Convert.ToDouble(reader["montoDescuento"]),
                                PrecioConDescuento = Convert.ToDouble(reader["precioConDescuento"]),
                                Oferta = reader["oferta"].ToString()
                            };

                            descuentos.Add(descuento);
                        }
                    }
                }
            }

            return descuentos;
        }


        public List<DescuentoOferta> ObtenerTodasOfertas(int idTipoHabitacion)
        {
            List<DescuentoOferta> descuentos = new List<DescuentoOferta>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("[dbo].[sp_todas_ofertas]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parámetro del procedimiento almacenado
                    command.Parameters.Add(new SqlParameter("@idTipoHabitacion", idTipoHabitacion));

                    // Ejecutar el procedimiento almacenado
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            DescuentoOferta descuento = new DescuentoOferta
                            {
                                Nombre = reader["nombre"].ToString(),
                                Precio = Convert.ToDouble(reader["precio"]),
                                Descuento = Convert.ToInt32(reader["descuento"]),
                                MontoDescuento = Convert.ToDouble(reader["montoDescuento"]),
                                PrecioConDescuento = Convert.ToDouble(reader["precioConDescuento"]),
                                Oferta = reader["oferta"].ToString()
                            };

                            descuentos.Add(descuento);
                        }
                    }
                }
            }

            return descuentos;
        }
    }
}
