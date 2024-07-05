using Dominio;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Datos
{
    public class TemporadaDatos
    {
        private readonly string _connectionString;

        public TemporadaDatos(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("HotelPalmConexion");
        }

        public async Task<List<Temporada>> GetAllTemporadasAsync()
        {
            List<Temporada> temporadas = new List<Temporada>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("sp_ListarTemporadas", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    await connection.OpenAsync();
                    SqlDataReader reader = await command.ExecuteReaderAsync();

                    while (await reader.ReadAsync())
                    {
                        Temporada temporada = new Temporada
                        {
                            ID_Temporada = Convert.ToInt32(reader["ID_Temporada"]),
                            FechaInicio = Convert.ToDateTime(reader["FechaInicio"]),
                            FechaFinal = Convert.ToDateTime(reader["FechaFinal"]),
                            Descuento = Convert.ToDecimal(reader["Descuento"])
                        };
                        temporadas.Add(temporada);
                    }

                    await reader.CloseAsync();
                }
            }

            return temporadas;
        }

        public async Task<Temporada> GetTemporadaByDateAsync(DateTime fecha)
        {
            Temporada temporada = null;

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("sp_ReadTemporada", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Fecha", fecha);

                    await connection.OpenAsync();
                    SqlDataReader reader = await command.ExecuteReaderAsync();

                    if (await reader.ReadAsync())
                    {
                        temporada = new Temporada
                        {
                            ID_Temporada = Convert.ToInt32(reader["ID_Temporada"]),
                            FechaInicio = Convert.ToDateTime(reader["FechaInicio"]),
                            FechaFinal = Convert.ToDateTime(reader["FechaFinal"]),
                            Descuento = Convert.ToDecimal(reader["Descuento"])
                        };
                    }

                    await reader.CloseAsync();
                }
            }

            return temporada;
        }

        public async Task<bool> CreateTemporadaAsync(Temporada temporada)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("sp_CreateTemporada", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@FechaInicio", temporada.FechaInicio);
                    command.Parameters.AddWithValue("@FechaFinal", temporada.FechaFinal);
                    command.Parameters.AddWithValue("@Descuento", temporada.Descuento);

                    await connection.OpenAsync();
                    await command.ExecuteNonQueryAsync();
                }
            }

            return true;
        }

        public async Task<bool> UpdateTemporadaAsync(Temporada temporada)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("sp_UpdateTemporada", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@ID_Temporada", temporada.ID_Temporada);
                    command.Parameters.AddWithValue("@FechaInicio", temporada.FechaInicio);
                    command.Parameters.AddWithValue("@FechaFinal", temporada.FechaFinal);
                    command.Parameters.AddWithValue("@Descuento", temporada.Descuento);

                    await connection.OpenAsync();
                    await command.ExecuteNonQueryAsync();
                }
            }

            return true;
        }

        public async Task<bool> DeleteTemporadaAsync(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("sp_DeleteTemporada", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@ID_Temporada", id);

                    await connection.OpenAsync();
                    await command.ExecuteNonQueryAsync();
                }
            }

            return true;
        }
    }
}
