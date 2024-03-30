using System;
using System.Collections.Generic;

namespace Domain.Model;

public partial class Reserva
{
    public int IdReserva { get; set; }

    public string? NumeroReserva { get; set; }

    public int? IdCliente { get; set; }

    public int? Habitacion { get; set; }

    public DateTime? FechaEntrada { get; set; }

    public DateTime? FechaSalida { get; set; }

    public int? IdEstado { get; set; }

    public virtual Habitacion? HabitacionNavigation { get; set; }

    public virtual Cliente? IdClienteNavigation { get; set; }

    public virtual EstadoReserva? IdEstadoNavigation { get; set; }
}
