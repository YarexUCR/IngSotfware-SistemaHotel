﻿using Dominio;
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
    public class HabitacionDatos
    {
        private readonly string _connectionString;
        public HabitacionDatos(IConfiguration configuration)
        {

            _connectionString = configuration.GetConnectionString("HotelPalmConexion");

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

                    while (reader.Read())
                    {
                        Habitacion habitacion = new Habitacion
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Numero = Convert.ToInt32(reader["numero"]),
                            Activo = Convert.ToBoolean(reader["activo"])
                            // Mapea otros campos según tu estructura de datos
                        };

                        habitacionesDisponibles.Add(habitacion);
                    }

                    reader.Close();
                }
            }

            return habitacionesDisponibles;
        }

        public async Task<List<Habitacion>> VerificarDisponibilidad(string check)
        {
            List<Habitacion> habitacionesDisponibles = new List<Habitacion>( );

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("VerificarDisponibilidad ", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@fecha_verificacion", check);
                

                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {

                        TipoHabitacion tipoHabitacion=new(){
           
                            Nombre = reader["nombre"].ToString()
                        };
                    
                        Habitacion habitacion = new Habitacion
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Numero = Convert.ToInt32(reader["numero"]),
                            Activo = Convert.ToBoolean(reader["activo"]),
                            Disponible = Convert.ToBoolean(reader["Disponible"]),
                            Tipo = tipoHabitacion
                            // Mapea otros campos según tu estructura de datos
                        };

                        habitacionesDisponibles.Add(habitacion);
                    }

                    reader.Close();
                }
            }

            return habitacionesDisponibles;
        }

    }
}
