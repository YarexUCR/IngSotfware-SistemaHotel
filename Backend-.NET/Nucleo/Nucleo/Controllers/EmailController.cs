// EmailController.cs
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        [HttpPost]
        [Route("send-email")]
        public async Task<IActionResult> SendEmail([FromBody] EmailDto emailDto)
        {
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("yarex2003@gmail.com", "szov kuvt cgyi ygum"), // Asegúrate de que esta es una contraseña de aplicación válida
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("yarex2003@gmail.com"), // Debe coincidir con la dirección de las credenciales
                Subject = "Contact Form Message",
                Body = $"Name: {emailDto.Name}\nEmail: {emailDto.Email}\nMessage: {emailDto.Message}",
                IsBodyHtml = false,
            };
            mailMessage.To.Add("yarex2003@gmail.com"); // O la dirección a la que deseas enviar el correo

            try
            {
                await smtpClient.SendMailAsync(mailMessage);
                return Ok("Email sent successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error sending email: {ex.Message}");
            }
        }
    }

    public class EmailDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
    }
}
