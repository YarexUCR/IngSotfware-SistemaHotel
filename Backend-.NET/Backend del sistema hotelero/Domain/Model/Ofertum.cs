using System;
using System.Collections.Generic;

namespace Domain.Model;

public partial class Ofertum
{
    public int IdOferta { get; set; }

    public DateTime? FechaInicio { get; set; }

    public DateTime? FechaFinal { get; set; }

    public string? Descripcion { get; set; }

    public double? Descuento { get; set; }

    public virtual ICollection<HabitacionOfertum> HabitacionOferta { get; set; } = new List<HabitacionOfertum>();
}
