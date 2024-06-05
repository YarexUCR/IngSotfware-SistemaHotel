using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    public class Hotel
    {
        public int id;
        public string home;
        public string sobre_nosotros;
        public string facilidades;
        public string como_llegar;

        public Hotel() { 
            this.id = 0;
            this.home = "";
            this.sobre_nosotros = "";
            this.facilidades = "";
            this.como_llegar = "";
        }

        public int Id { get => id; set => id = value; }
        public string Home { get => home; set => home = value; }
        public string Sobre_nosotros { get => sobre_nosotros;set => sobre_nosotros = value; }

        public string Facilidades { get => facilidades; set => facilidades = value; }

        public string Como_Llegar { get => como_llegar; set => como_llegar = value; }
    }
}
