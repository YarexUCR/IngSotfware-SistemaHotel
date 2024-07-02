using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    public class DescuentoOferta
    {
        public string nombre;
        public double precio;
        public int descuento;
        public double montoDescuento;
        public double precioConDescuento;
        public string oferta;

        public DescuentoOferta() {
            this.nombre = "";
            this.precio = 0;
            this.descuento = 0;
            this.montoDescuento = 0;
            this.precioConDescuento= 0;
            this.oferta = "";
        }

        public string Nombre { get => nombre; set => nombre = value; }

        public double Precio { get => precio; set => precio = value; }

        public int Descuento { get => descuento; set => descuento = value; }

        public double MontoDescuento { get => montoDescuento; set => montoDescuento = value; }

        public double PrecioConDescuento { get => precioConDescuento; set => precioConDescuento = value; }

        public string Oferta { get => oferta; set => oferta = value; }
    }
}
