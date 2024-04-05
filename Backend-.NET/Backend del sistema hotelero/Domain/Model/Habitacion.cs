using System;
using System.Collections.Generic;

namespace Domain.Model;

public partial class Habitacion
{
    public int IdHabitacion { get; set; }

    public string? Numero { get; set; }

    public int? IdEstado { get; set; }

    public int? IdTipoHabitacion { get; set; }

    public virtual EstadoHabitacion? IdEstadoNavigation { get; set; }

    public virtual TipoHabitacion? IdTipoHabitacionNavigation { get; set; }

    public virtual ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
}
