using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Domain.Model;

public partial class If7100hotel2024Context : DbContext
{
    public If7100hotel2024Context()
    {
    }

    public If7100hotel2024Context(DbContextOptions<If7100hotel2024Context> options)
        : base(options)
    {
    }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<EstadoHabitacion> EstadoHabitacions { get; set; }

    public virtual DbSet<EstadoReserva> EstadoReservas { get; set; }

    public virtual DbSet<FotosHotel> FotosHotels { get; set; }

    public virtual DbSet<Habitacion> Habitacions { get; set; }

    public virtual DbSet<HabitacionOfertum> HabitacionOferta { get; set; }

    public virtual DbSet<Hotel> Hotels { get; set; }

    public virtual DbSet<Ofertum> Oferta { get; set; }

    public virtual DbSet<Reserva> Reservas { get; set; }

    public virtual DbSet<TipoHabitacion> TipoHabitacions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=163.178.107.10;Initial Catalog=IF7100Hotel2024;User ID=laboratorios;Password=TUy&)&nfC7QqQau.%278UQ24/=%;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.IdCliente).HasName("PK__Cliente__E005FBFFE3CFAC79");

            entity.ToTable("Cliente", "Cliente");

            entity.Property(e => e.IdCliente).HasColumnName("ID_Cliente");
            entity.Property(e => e.Apellido)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<EstadoHabitacion>(entity =>
        {
            entity.HasKey(e => e.IdEstadoHabitacion).HasName("PK__EstadoHa__0F065B74AD179E56");

            entity.ToTable("EstadoHabitacion", "Hotel");

            entity.Property(e => e.IdEstadoHabitacion).HasColumnName("ID_EstadoHabitacion");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<EstadoReserva>(entity =>
        {
            entity.HasKey(e => e.IdEstado).HasName("PK__EstadoRe__9CF49395679C8E3E");

            entity.ToTable("EstadoReserva", "Hotel");

            entity.Property(e => e.IdEstado).HasColumnName("ID_Estado");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<FotosHotel>(entity =>
        {
            entity.HasKey(e => e.IdFoto).HasName("PK__FotosHot__195DD875CA076124");

            entity.ToTable("FotosHotel");

            entity.Property(e => e.IdFoto).HasColumnName("ID_Foto");
            entity.Property(e => e.IdHotel).HasColumnName("ID_Hotel");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nombre");

            entity.HasOne(d => d.IdHotelNavigation).WithMany(p => p.FotosHotels)
                .HasForeignKey(d => d.IdHotel)
                .HasConstraintName("FK_FotosHotel.ID_Hotel");
        });

        modelBuilder.Entity<Habitacion>(entity =>
        {
            entity.HasKey(e => e.IdHabitacion).HasName("PK__Habitaci__9B6832541C959BAF");

            entity.ToTable("Habitacion", "Hotel");

            entity.Property(e => e.IdHabitacion).HasColumnName("ID_Habitacion");
            entity.Property(e => e.IdEstado).HasColumnName("ID_Estado");
            entity.Property(e => e.IdTipoHabitacion).HasColumnName("ID_TipoHabitacion");
            entity.Property(e => e.Numero)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.IdEstadoNavigation).WithMany(p => p.Habitacions)
                .HasForeignKey(d => d.IdEstado)
                .HasConstraintName("FK_Habitacion.ID_Estado");

            entity.HasOne(d => d.IdTipoHabitacionNavigation).WithMany(p => p.Habitacions)
                .HasForeignKey(d => d.IdTipoHabitacion)
                .HasConstraintName("FK_Habitacion.ID_TipoHabitacion");
        });

        modelBuilder.Entity<HabitacionOfertum>(entity =>
        {
            entity.HasKey(e => e.IdHabitacionOferta).HasName("PK__Habitaci__23F60B4E135E0ADE");

            entity.Property(e => e.IdHabitacionOferta).HasColumnName("ID_HabitacionOferta");
            entity.Property(e => e.IdOferta).HasColumnName("ID_Oferta");
            entity.Property(e => e.IdTipoHabitacion).HasColumnName("ID_TipoHabitacion");

            entity.HasOne(d => d.IdOfertaNavigation).WithMany(p => p.HabitacionOferta)
                .HasForeignKey(d => d.IdOferta)
                .HasConstraintName("FK_HabitacionOferta.ID_Oferta");

            entity.HasOne(d => d.IdTipoHabitacionNavigation).WithMany(p => p.HabitacionOferta)
                .HasForeignKey(d => d.IdTipoHabitacion)
                .HasConstraintName("FK_HabitacionOferta.ID_TipoHabitacion");
        });

        modelBuilder.Entity<Hotel>(entity =>
        {
            entity.HasKey(e => e.IdHotel).HasName("PK__Hotel__198505EF6D919211");

            entity.ToTable("Hotel", "Hotel");

            entity.Property(e => e.IdHotel).HasColumnName("ID_Hotel");
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Descripcion).HasColumnType("text");
            entity.Property(e => e.ImagenHotel)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.InformacionServicion)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Ubicacion)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Ofertum>(entity =>
        {
            entity.HasKey(e => e.IdOferta).HasName("PK__Oferta__DA770106D0BB931A");

            entity.ToTable("Oferta", "Hotel");

            entity.Property(e => e.IdOferta).HasColumnName("ID_Oferta");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaFinal).HasColumnType("date");
            entity.Property(e => e.FechaInicio).HasColumnType("date");
        });

        modelBuilder.Entity<Reserva>(entity =>
        {
            entity.HasKey(e => e.IdReserva).HasName("PK__Reserva__12CAD9F472AF8F06");

            entity.ToTable("Reserva");

            entity.Property(e => e.IdReserva).HasColumnName("ID_Reserva");
            entity.Property(e => e.FechaEntrada).HasColumnType("date");
            entity.Property(e => e.FechaSalida).HasColumnType("date");
            entity.Property(e => e.IdCliente).HasColumnName("ID_Cliente");
            entity.Property(e => e.IdEstado).HasColumnName("ID_Estado");
            entity.Property(e => e.NumeroReserva)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.HabitacionNavigation).WithMany(p => p.Reservas)
                .HasForeignKey(d => d.Habitacion)
                .HasConstraintName("FK_Reserva.Habitacion");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Reservas)
                .HasForeignKey(d => d.IdCliente)
                .HasConstraintName("FK_Reserva.ID_Cliente");

            entity.HasOne(d => d.IdEstadoNavigation).WithMany(p => p.Reservas)
                .HasForeignKey(d => d.IdEstado)
                .HasConstraintName("FK_Reserva.ID_Estado");
        });

        modelBuilder.Entity<TipoHabitacion>(entity =>
        {
            entity.HasKey(e => e.IdTipoHabitacion).HasName("PK__TipoHabi__137C171971CD8976");

            entity.ToTable("TipoHabitacion", "Hotel");

            entity.Property(e => e.IdTipoHabitacion).HasColumnName("ID_TipoHabitacion");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Imagen)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
