using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    public class Reserva
    {
        public int id;
        public string cliente;
        public string cedula;
        public List<Habitacion> habitaciones;
        public int total;
        public string email;
        public DateTime checkIn;
        public DateTime checkOut;

        public Reserva() { 
            this.total = 0;
            this.id = 0;
            this.cliente = "";
            this.habitaciones = new List<Habitacion>();
            this.cedula = "";
            this.email = "";
            this.checkIn = DateTime.Now;
            this.checkOut = DateTime.Now;
        }

        public Reserva(int id, string cliente, string cedula, List<Habitacion> habitaciones, int total, string email, DateTime checkIn, DateTime checkOut)
        {
            this.id = id;
            this.cliente = cliente;
            this.cedula = cedula;
            this.habitaciones = habitaciones;
            this.total = total;
            this.email = email;
            this.checkIn = checkIn;
            this.checkOut = checkOut;
        }

        public int Id { get => id; set => id = value; }
        public string Cliente { get => cliente; set => cliente = value; }
        public string Cedula { get => cedula; set => cedula = value; }
        public List<Habitacion>Habitaciones {  get => habitaciones; set => habitaciones = value;} 
        public int Total { get => total; set => total = value; }

        public string Email { get => email; set => email = value; }

        public DateTime CheckIn { get => checkIn; set => checkIn = value; }
        public DateTime CheckOut { get => checkOut; set => checkOut = value; }
    }
}
