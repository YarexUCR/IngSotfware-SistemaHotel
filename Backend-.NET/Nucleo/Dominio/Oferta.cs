viusing System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    public class Oferta

    {
        public int id;
        public DateTime inicio;
        public DateTime fin;
        public int descuento;
        public List<TipoHabitacion> tipoHabitacion;

        public Oferta() { 
            this.id = 0;
            this.descuento = 0;
            this.tipoHabitacion = new List<TipoHabitacion>();
            this.inicio = new DateTime();
            this.fin = new DateTime();
        }

        public int Id { get => id; set => id = value; }
        public string Nombre { get; set; }
        public DateTime Inicio { get => inicio; set => inicio = value; }

        public DateTime Fin { get => fin; set => fin = value; }

        public int Descuento { get => descuento; set => descuento = value; }
        public List<TipoHabitacion> TipoHabitacions { get => tipoHabitacion; set => tipoHabitacion = value; }
    }
}
