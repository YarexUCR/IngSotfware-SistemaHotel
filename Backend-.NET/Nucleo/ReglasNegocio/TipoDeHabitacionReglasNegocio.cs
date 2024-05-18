namespace ReglasNegocio
{
    using Datos;
    using Dominio;
    using Microsoft.Extensions.Configuration;

    public class TipoDeHabitacionReglasNegocio
    {

        private TipoHabitacionDatos datos;

        public TipoDeHabitacionReglasNegocio(IConfiguration configuration) { 
            datos = new TipoHabitacionDatos(configuration);
        }

        public List<TipoHabitacion> obtenerTipoHabitaciones() {
            return this.datos.obtenerTipoHabitacion();
        }

        public List<HabitacionesDisponibles> ObtenerCantidadHabitacionesDisponibles(DateTime fechaInicio, DateTime fechaFin) {
            return this.datos.ObtenerCantidadHabitacionesDisponibles(fechaInicio, fechaFin);
        }

        public int ObtenerCantidadHabitacionesDisponiblesPorDiaTipo(DateTime fecha, int tipoHabitacionId) {
            return this.datos.ObtenerCantidadHabitacionesDisponiblesPorDiaTipo(fecha,tipoHabitacionId);
        }

        public List<Habitacion> ObtenerHabitacionesDisponiblesParaReserva(DateTime checkIn, DateTime checkOut, int tipoHabitacion) {
            return this.datos.ObtenerHabitacionesDisponiblesParaReserva(checkIn,checkOut,tipoHabitacion);
        }
        public List<Habitacion> ObtenerTodasHabitacionesDisponiblesParaReserva(DateTime checkIn, DateTime checkOut) {
            return this.datos.ObtenerTodasHabitacionesDisponiblesParaReserva(checkIn,checkOut);
        }

        public List<Habitacion> ObtenerTodasHabitaciones() {
            return this.datos.ObtenerTodasHabitaciones();
        }
    }
}