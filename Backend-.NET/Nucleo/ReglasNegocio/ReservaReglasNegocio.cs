using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Datos;
using Dominio;
using Microsoft.Extensions.Configuration;

namespace ReglasNegocio
{
    public class ReservaReglasNegocio
    {
        private ReservaDatos datos;

        public ReservaReglasNegocio(IConfiguration configuration)
        {
            datos = new ReservaDatos(configuration);
        }

        public int InsertarReserva(Reserva reserva) {
            int reservaID = this.datos.InsertarReserva(reserva);
            if (reservaID!=0) {
                reserva.Id = reservaID;
                enviarCorreo(reserva);
            }
            return reservaID;
        }

        public string redactarCorreo(Reserva reserva) {
            string body = "Numero de Reserva: "+reserva.Id+ "\n Fecha de entrada: " + reserva.CheckIn.Date.ToString("yyyy-MM-dd") + " Fecha de salida\n" + reserva.checkOut.ToString("yyyy-MM-dd") + "\n";
            body = body + "Nombre: " + reserva.cliente + " Cedula: " + reserva.cedula+"\n";
            body = body + "Habitaciones\n";
            foreach (Habitacion habitacion in reserva.Habitaciones) {
                body = body + "Habitacion: " + habitacion.numero + " Tipo: " + habitacion.tipo.Nombre + " Precio por noche: $"+ habitacion.tipo.Precio+"\n";
            }
            body = body+"Total= $"+reserva.total + "\n";
            return body;
        }

        public void enviarCorreo(Reserva reserva) {
            var fromAddress = new MailAddress("chesky22@hotmail.com", "Hotel Palm");
            var toAddress = new MailAddress(reserva.email, reserva.cliente);
            const string fromPassword = "proevolutionsocc";
            const string subject = "Reserva";
            string body = redactarCorreo(reserva);
            var smtp = new SmtpClient
            {
                Host = "smtp-mail.outlook.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };

            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }
            Console.WriteLine("Correo enviado correctamente.");
        }
    }
}
