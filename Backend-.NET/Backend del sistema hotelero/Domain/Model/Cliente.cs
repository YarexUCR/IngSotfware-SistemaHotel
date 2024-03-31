using System;
using System.Collections.Generic;

namespace Domain.Model;

public partial class Cliente
{
    public int IdCliente { get; set; }

    public int? Cedula { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Correo { get; set; }

    public string? Telefono { get; set; }

    public virtual ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
}
