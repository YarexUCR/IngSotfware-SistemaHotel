using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    public  class Publicidad
    {
        int id;
        string nombre;
        string enlace;
        string imagen;

        public Publicidad() { 
            this.id = 0;
            this.nombre = "";
            this.enlace = "";
            this.imagen = "";
        }

        public int Id { get => id; set => id = value; }
        public string Nombre { get => nombre; set => nombre = value; }
        public string Enlace { get => enlace; set => enlace = value; }

        public string Imagen { get => imagen; set => imagen = value; }
    }
}
