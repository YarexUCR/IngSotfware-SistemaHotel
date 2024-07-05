using Dominio;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Datos
{
    public class PublicidadDatos
    {
        private readonly string _connectionString;
        public PublicidadDatos (IConfiguration configuration)
        {

            _connectionString = configuration.GetConnectionString("HotelPalmConexion");

        }

        public bool InsertarPublicidad(Publicidad publicidad)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("[dbo].[InsertarPublicidad]", connection))
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@Nombre", publicidad.Nombre);
                        command.Parameters.AddWithValue("@Enlace", publicidad.Enlace);
                        command.Parameters.AddWithValue("@Imagen", publicidad.Imagen);

                        connection.Open();
                        command.ExecuteNonQuery();
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                // Puedes agregar algún manejo de log o excepción aquí si es necesario.
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public List<Publicidad> ObtenerTodasPublicidad()
        {
            List<Publicidad> publicidades = new List<Publicidad>();

            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("[dbo].[ObtenerTodasPublicidad]", connection))
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;

                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Publicidad publicidad = new Publicidad
                                {
                                    Id = Convert.ToInt32(reader["Id"]),
                                    Nombre = reader["Nombre"].ToString(),
                                    Enlace = reader["Enlace"].ToString(),
                                    Imagen = reader["Imagen"].ToString()
                                };

                                publicidades.Add(publicidad);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Puedes agregar algún manejo de log o excepción aquí si es necesario.
                Console.WriteLine(ex.Message);
            }

            return publicidades;
        }

        public bool EliminarPublicidad(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("[dbo].[EliminarPublicidad]", connection))
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@id", id);

                        connection.Open();
                        command.ExecuteNonQuery();
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                // Puedes agregar algún manejo de log o excepción aquí si es necesario.
                Console.WriteLine(ex.Message);
                return false;
            }
        }

    }
}
