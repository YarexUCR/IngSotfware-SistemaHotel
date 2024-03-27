using System;
using System.Collections.Generic;

namespace Domain.Model;

public partial class HabitacionOfertum
{
    public int IdHabitacionOferta { get; set; }

    public int? IdOferta { get; set; }

    public int? IdTipoHabitacion { get; set; }

    public virtual Ofertum? IdOfertaNavigation { get; set; }

    public virtual TipoHabitacion? IdTipoHabitacionNavigation { get; set; }
}
