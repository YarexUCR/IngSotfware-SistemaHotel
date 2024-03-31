using System;
using System.Collections.Generic;

namespace Domain.Model;

public partial class FotosHotel
{
    public int IdFoto { get; set; }

    public int? IdHotel { get; set; }

    public string? Nombre { get; set; }

    public virtual Hotel? IdHotelNavigation { get; set; }
}
