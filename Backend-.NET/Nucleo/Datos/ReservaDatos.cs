using Dominio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos
{
    public class ReservaDatos
    {
        private List<Reserva> reservas;

        public ReservaDatos() {
            this.reservas = new List<Reserva>();
            reservas.Add(new Reserva());
        }

        public List<Reserva> obtenerReservas()
        {
            return this.reservas;
        }

        public bool agregarReserva(Reserva reserva) {
            int tamaño = this.reservas.Count;
            this.reservas.Add(reserva);
            if (tamaño != this.reservas.Count) { 
                return true;
            }else { 
                return false; 
            }
        }
    }
}
