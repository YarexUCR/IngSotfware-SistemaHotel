using System;
using System.Collections.Generic;

namespace Domain.Model;

public partial class TipoHabitacion
{
    public int IdTipoHabitacion { get; set; }

    public string? Descripcion { get; set; }

    public double? Precio { get; set; }

    public string? Imagen { get; set; }

    public virtual ICollection<HabitacionOfertum> HabitacionOferta { get; set; } = new List<HabitacionOfertum>();

    public virtual ICollection<Habitacion> Habitacions { get; set; } = new List<Habitacion>();
}
