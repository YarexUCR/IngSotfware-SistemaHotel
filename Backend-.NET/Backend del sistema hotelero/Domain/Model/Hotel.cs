using System;
using System.Collections.Generic;

namespace Domain.Model;

public partial class Hotel
{
    public int IdHotel { get; set; }

    public string? Nombre { get; set; }

    public string? Telefono { get; set; }

    public string? Correo { get; set; }

    public string? Ubicacion { get; set; }

    public string? ImagenHotel { get; set; }

    public string? Descripcion { get; set; }

    public string? InformacionServicion { get; set; }

    public virtual ICollection<FotosHotel> FotosHotels { get; set; } = new List<FotosHotel>();
}
