using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    public class Habitacion
    {
        public int id;
        public string estado;
        public int numero;
        public TipoHabitacion tipo;
        public bool activo;
        public bool disponible;


        public Habitacion() { 
            this.id = 0;
            this.estado = "";
            this.numero = 0;
            this.tipo = new TipoHabitacion();
            this.activo = false;
        }

        public Habitacion(int id, string estado, int numero, TipoHabitacion tipo, bool activo)
        {
            this.id = id;
            this.estado = estado;
            this.numero = numero;
            this.tipo = tipo;
            this.activo = activo;
        }

        public int Id { get => id; set => id = value; }
        public string Estado { get => estado; set => estado = value; }
        public bool Activo { get => activo; set => activo = value; }
        public int Numero { get => numero; set => numero = value; }
        public bool Disponible { get => disponible; set => disponible = value; }
        public TipoHabitacion Tipo { get => tipo; set => tipo = value; }
    }
}
