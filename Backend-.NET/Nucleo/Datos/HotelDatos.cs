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
    public class HotelDatos
    {
        private readonly string _connectionString;
        public HotelDatos(IConfiguration configuration)
        {

            _connectionString = configuration.GetConnectionString("HotelPalmConexion");

        }

        public bool ActualizarHome(Hotel hotel)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("actualizar_home", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@id", hotel.Id);
                        command.Parameters.AddWithValue("@home", hotel.Home);

                        connection.Open();
                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }
                return true; // La actualización fue exitosa
            }
            catch (Exception)
            {
                // Manejo de errores (puedes registrar el error o manejarlo según tu necesidad)
                return false; // La actualización falló
            }
        }

        public Hotel ObtenerHome(int id)
        {   
            Hotel hotel = new Hotel();
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("Obtener_home", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@id", id);

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {

                                hotel.Home = reader["home"].ToString();
                                hotel.Id = id;
                                return hotel;
                            }
                            else
                            {
                                return hotel;
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                // Manejo de errores (puedes registrar el error o manejarlo según tu necesidad)
                return hotel; // Error al obtener el home
            }
        }

        public Hotel ObtenerComoLlegar(int id)
        {
            Hotel hotel = new Hotel();
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("Obtener_como_llegar", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@id", id);

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {

                                hotel.Como_Llegar = reader["como_llegar"].ToString();
                                hotel.Id = id;
                                return hotel;
                            }
                            else
                            {
                                return hotel;
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                // Manejo de errores (puedes registrar el error o manejarlo según tu necesidad)
                return hotel; // Error al obtener el como llegar
            }
        }

        public bool ActualizarComoLlegar(Hotel hotel)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("actualizar_como_llegar", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@id", hotel.Id);
                        command.Parameters.AddWithValue("@como_llegar", hotel.Como_Llegar);

                        connection.Open();
                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }
                return true; // La actualización fue exitosa
            }
            catch (Exception)
            {
                // Manejo de errores (puedes registrar el error o manejarlo según tu necesidad)
                return false; // La actualización falló
            }
        }

        public Hotel ObtenerSobreNosotros(int id)
        {
            Hotel hotel = new Hotel();
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("Obtener_sobre_nosotros", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@id", id);

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {

                                hotel.Sobre_nosotros = reader["sobre_nosotros"].ToString();
                                hotel.Id = id;
                                return hotel;
                            }
                            else
                            {
                                return hotel;
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                // Manejo de errores (puedes registrar el error o manejarlo según tu necesidad)
                return hotel; // Error al obtener el como llegar
            }
        }

        public bool ActualizarSobreNosotros(Hotel hotel)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("actualizar_sobre_nosotros", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@id", hotel.Id);
                        command.Parameters.AddWithValue("@sobre_nosotros", hotel.Sobre_nosotros);

                        connection.Open();
                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }
                return true; // La actualización fue exitosa
            }
            catch (Exception)
            {
                // Manejo de errores (puedes registrar el error o manejarlo según tu necesidad)
                return false; // La actualización falló
            }
        }

        public Hotel ObtenerFacilidades(int id)
        {
            Hotel hotel = new Hotel();
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("Obtener_facilidades", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@id", id);

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {

                                hotel.Facilidades = reader["facilidades"].ToString();
                                hotel.Id = id;
                                return hotel;
                            }
                            else
                            {
                                return hotel;
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                // Manejo de errores (puedes registrar el error o manejarlo según tu necesidad)
                return hotel; // Error al obtener el como llegar
            }
        }

        public bool ActualizarFacilidades(Hotel hotel)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("actualizar_facilidades", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@id", hotel.Id);
                        command.Parameters.AddWithValue("@facilidades", hotel.Facilidades);

                        connection.Open();
                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }
                return true; // La actualización fue exitosa
            }
            catch (Exception)
            {
                // Manejo de errores (puedes registrar el error o manejarlo según tu necesidad)
                return false; // La actualización falló
            }
        }

        public Hotel ObtenerImagenHome(int id)
        {
            Hotel hotel = new Hotel();
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("Obtener_imagen_home", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@id", id);

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {

                                hotel.Imagen_Home = reader["imagenHome"].ToString();
                                hotel.Id = id;
                                return hotel;
                            }
                            else
                            {
                                return hotel;
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                // Manejo de errores (puedes registrar el error o manejarlo según tu necesidad)
                return hotel; // Error al obtener el como llegar
            }
        }

        public bool ActualizarImagenHome(string ruta)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("actualizar_imagen_home", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@id", 1);
                        command.Parameters.AddWithValue("@imagen", ruta);

                        connection.Open();
                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }
                return true; // La actualización fue exitosa
            }
            catch (Exception)
            {
                // Manejo de errores (puedes registrar el error o manejarlo según tu necesidad)
                return false; // La actualización falló
            }
        }

    }
}
