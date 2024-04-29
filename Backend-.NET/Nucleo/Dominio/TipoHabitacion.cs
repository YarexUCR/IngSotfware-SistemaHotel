namespace Dominio
{
    public class TipoHabitacion
    {
        public int id;
        public string descripcion;
        public double precio;
        public string imagen;
        public int cantidad;
        public string nombre;
        public TipoHabitacion() {
            descripcion = string.Empty;
            imagen = string.Empty;
            nombre = string.Empty;
        }


        public string Nombre { get => nombre; set => nombre = value; }
        public int Id { get => id; set => id = value; }
        public string Descripcion { get => descripcion;  set => descripcion = value; }
        public double Precio { get => precio; set => precio = value; }
        public string Imagen { get => imagen; set => imagen = value; }
        public int Cantidad { get => cantidad; set => cantidad = value; }
    }
}