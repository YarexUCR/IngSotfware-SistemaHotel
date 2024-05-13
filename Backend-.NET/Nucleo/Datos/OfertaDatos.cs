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


            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("SeleccionarOferta", connection))
                {


                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        List<TipoHabitacion> tipoHabitacion = new List<TipoHabitacion>();
                        Oferta oferta = new Oferta
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Nombre = Convert.ToString(reader["descripcion"]),
                            Descuento = Convert.ToInt32(reader["descuento"]),
                            Inicio = Convert.ToDateTime(reader["inicio"]),
                            Fin = Convert.ToDateTime(reader["fin"]),

                        };
                        tipoHabitacion = await getTipoDeHabitcion(oferta.Id);
                        oferta.TipoHabitacions = tipoHabitacion;
                        ofertas.Add(oferta);
                    }

                    reader.Close();
                }
            }

            return ofertas;
        }


       public async Task<Oferta> getOferta(int id)
        {
            Oferta oferta = new Oferta();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("SeleccionarOferta", connection))
                {


                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        List<TipoHabitacion> tipoHabitacion = new List<TipoHabitacion>();

                        oferta.Id = Convert.ToInt32(reader["id"]);
                            oferta.Nombre = Convert.ToString(reader["descripcion"]);
                        oferta.Descuento = Convert.ToInt32(reader["descuento"]);
                        oferta.Inicio = Convert.ToDateTime(reader["inicio"]);
                        oferta.Fin = Convert.ToDateTime(reader["fin"]);


                        tipoHabitacion = await getTipoDeHabitcion(oferta.Id);
                        oferta.TipoHabitacions = tipoHabitacion;
                       
                    }

                    reader.Close();
                }
            }

            return oferta;
        }

         async Task<List<TipoHabitacion>> getTipoDeHabitcion(int id)
        {

            List<TipoHabitacion> tipoHabitaciones = new List<TipoHabitacion>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("BuscarTipoHabitacionPorOferta", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@IDBUSCAR", id);


                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        TipoHabitacion tipoHabitacion = new TipoHabitacion
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Nombre = Convert.ToString(reader["nombre"]),

                        };

                        tipoHabitaciones.Add(tipoHabitacion);
                    }

                    reader.Close();
                }
            }

            return tipoHabitaciones;
        }


        public async Task<bool> agregarOferta(Oferta oferta)
        {
            int nuevoID = 0; // Variable para almacenar el nuevo ID de la oferta

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("InsertarOferta", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@inicio", oferta.Inicio);
                    command.Parameters.AddWithValue("@fin", oferta.Fin);
                    command.Parameters.AddWithValue("@descripcion", oferta.Nombre);
                    command.Parameters.AddWithValue("@descuento", oferta.Descuento);
                    command.Parameters.Add("@nuevoID", SqlDbType.Int).Direction = ParameterDirection.Output; // Agregar parámetro de salida

                    connection.Open();
                    await command.ExecuteNonQueryAsync(); // Ejecutar el procedimiento almacenado

                    nuevoID = Convert.ToInt32(command.Parameters["@nuevoID"].Value); // Obtener el valor del parámetro de salida
                }
            }

            
            if (nuevoID == 0 ) { return false; }
            else {
                await insertarTipoHabitacionoferta(nuevoID, oferta.TipoHabitacions);
                return true;
            }
        }
        public async Task<bool> updateOferta(Oferta oferta)
        {
            bool isUpdated = false;

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("ActualizarOferta", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Agrega los parámetros al procedimiento almacenado
                    command.Parameters.AddWithValue("@id", oferta.Id);
                    command.Parameters.AddWithValue("@inicio", oferta.Inicio);
                    command.Parameters.AddWithValue("@fin", oferta.Fin);
                    command.Parameters.AddWithValue("@descripcion", oferta.Nombre);
                    command.Parameters.AddWithValue("@descuento", oferta.Descuento);

                    await connection.OpenAsync();

                    // Ejecuta el comando asíncronamente
                    int rowsAffected = await command.ExecuteNonQueryAsync();

                    // Verifica si se actualizó al menos una fila
                    isUpdated = rowsAffected > 0;
                }
            }
            if (isUpdated)
            {
                await insertarTipoHabitacionoferta(oferta.id, oferta.TipoHabitacions);
            }

            return isUpdated;
        }

        async Task<bool> insertarTipoHabitacionoferta(int idOferta, List<TipoHabitacion> tipoHabitacions)
        {
            int tamaño = 0;
            foreach (TipoHabitacion tipoHabitacion in tipoHabitacions)
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("InsertarOfertaTipoHabitacion", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@ofertaId", idOferta);
                        command.Parameters.AddWithValue("@tipoHabitacionId", tipoHabitacion.Id);
                        connection.Open();

                        command.ExecuteReader();

                        connection.Close();
                    }
                }
            }
            if (tamaño != 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        /*
        public async Task<Oferta> getOferta(int id )
        {
            List<TipoHabitacion> tipoHabitacions = new List<TipoHabitacion>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("ObtenerTodasHabitacionesDisponiblesParaReserva", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@idOferta", id);

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
        */
        public async Task<bool> deleteOferta(int ofertaId)
        {
            bool isDeleted = false;

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("EliminarOferta", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Agrega el parámetro @ofertaId al procedimiento almacenado
                    command.Parameters.AddWithValue("@ofertaId", ofertaId);

                    await connection.OpenAsync();

                    // Ejecuta el comando asíncronamente
                    int rowsAffected = await command.ExecuteNonQueryAsync();

                    // Verifica si se eliminó al menos una fila
                    isDeleted = rowsAffected > 0;
                }
            }

            return isDeleted;
        }


    }


   


}
