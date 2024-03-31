--Create dataBase IF7100Hotel2024
Use IF7100Hotel2024
go

--Create schema Cliente
--Create schema Hotel
--Create schema Administrativo

CREATE TABLE Hotel.[EstadoReserva] (
  [ID_Estado] INT IDENTITY(1,1),
  [Descripcion] VARCHAR(255),
  PRIMARY KEY ([ID_Estado])
);

CREATE TABLE Hotel.[TipoHabitacion] (
  [ID_TipoHabitacion] INT IDENTITY(1,1),
  [Descripcion] VARCHAR(255),
  [Precio] FLOAT,
  [Imagen] VARCHAR(255),
  PRIMARY KEY ([ID_TipoHabitacion])
);

CREATE TABLE Hotel.[EstadoHabitacion] (
  [ID_EstadoHabitacion] INT IDENTITY(1,1),
  [Descripcion] VARCHAR(255),
  PRIMARY KEY ([ID_EstadoHabitacion])
);

CREATE TABLE Hotel.[Habitacion] (
  [ID_Habitacion] INT IDENTITY(1,1),
  [Numero] VARCHAR(255),
  [ID_Estado] INT,
  [ID_TipoHabitacion] INT,
  PRIMARY KEY ([ID_Habitacion]),
  CONSTRAINT [FK_Habitacion.ID_TipoHabitacion]
    FOREIGN KEY ([ID_TipoHabitacion])
      REFERENCES [Hotel].[TipoHabitacion]([ID_TipoHabitacion]),
  CONSTRAINT [FK_Habitacion.ID_Estado]
    FOREIGN KEY ([ID_Estado])
      REFERENCES [Hotel].[EstadoHabitacion]([ID_EstadoHabitacion])
);

CREATE TABLE Hotel.[Oferta] (
  [ID_Oferta] INT IDENTITY(1,1),
  [FechaInicio] Date,
  [FechaFinal] Date,
  [Descripcion] VARCHAR(255),
  [Descuento] FLOAT,
  PRIMARY KEY ([ID_Oferta])
);

CREATE TABLE Hotel.[Hotel] (
  [ID_Hotel] INT IDENTITY(1,1),
  [Nombre] VARCHAR(255),
  [Telefono] VARCHAR(255),
  [Correo] VARCHAR(255),
  [Ubicacion] VARCHAR(255),
  [ImagenHotel] VARCHAR(255),
  [Descripcion] TEXt,
  [InformacionServicion] VARCHAR(255),
  PRIMARY KEY ([ID_Hotel])
);

CREATE TABLE [FotosHotel] (
  [ID_Foto] INT IDENTITY(1,1),
  [ID_Hotel] INT,
  [nombre] VARCHAR(255),
  PRIMARY KEY ([ID_Foto]),
  CONSTRAINT [FK_FotosHotel.ID_Hotel]
    FOREIGN KEY ([ID_Hotel])
      REFERENCES Hotel.[Hotel]([ID_Hotel])
);

CREATE TABLE Cliente.[Cliente] (
  [ID_Cliente] INT IDENTITY(1,1),
  [Cedula] INT,
  [Nombre] VARCHAR(255),
  [Apellido] VARCHAR(255),
  [Correo] VARCHAR(255),
  [Telefono] VARCHAR(255),
  PRIMARY KEY ([ID_Cliente])
);

CREATE TABLE [HabitacionOferta] (
  [ID_HabitacionOferta] INT IDENTITY(1,1),
  [ID_Oferta] INT,
  [ID_TipoHabitacion] INT,
  PRIMARY KEY ([ID_HabitacionOferta]),
  CONSTRAINT [FK_HabitacionOferta.ID_Oferta]
    FOREIGN KEY ([ID_Oferta])
      REFERENCES Hotel.[Oferta]([ID_Oferta]),
  CONSTRAINT [FK_HabitacionOferta.ID_TipoHabitacion]
    FOREIGN KEY ([ID_TipoHabitacion])
      REFERENCES Hotel.[TipoHabitacion]([ID_TipoHabitacion])
);

CREATE TABLE [Reserva] (
  [ID_Reserva] INT IDENTITY(1,1),
  [NumeroReserva] VARCHAR(255),
  [ID_Cliente] INT,
  [Habitacion] INT,
  [FechaEntrada] Date,
  [FechaSalida] Date,
  [ID_Estado] INT,
  PRIMARY KEY ([ID_Reserva]),
  CONSTRAINT [FK_Reserva.Habitacion]
    FOREIGN KEY ([Habitacion])
      REFERENCES Hotel.[Habitacion]([ID_Habitacion]),
  CONSTRAINT [FK_Reserva.ID_Estado]
    FOREIGN KEY ([ID_Estado])
      REFERENCES Hotel.[EstadoReserva]([ID_Estado]),
  CONSTRAINT [FK_Reserva.ID_Cliente]
    FOREIGN KEY ([ID_Cliente])
      REFERENCES Cliente.[Cliente]([ID_Cliente])
);

