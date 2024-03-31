using System;
using System.Collections.Generic;

namespace Domain.Model;

public partial class EstadoReserva
{
    public int IdEstado { get; set; }

    public string? Descripcion { get; set; }

    public virtual ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
}
