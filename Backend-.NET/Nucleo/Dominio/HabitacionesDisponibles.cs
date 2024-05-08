using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    public class HabitacionesDisponibles
    {
        string tipo;
        int cantidad;

        public HabitacionesDisponibles() {
            this.cantidad = 0;
            this.tipo = "";
        }

        public string Tipo { get => tipo; set => tipo = value; }
        public int Cantidad { get => cantidad; set => cantidad = value; }
    }
}
