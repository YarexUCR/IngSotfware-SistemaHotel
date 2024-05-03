USE HotelPalm

CREATE PROCEDURE SeleccionarOferta
AS
BEGIN
    SELECT [id], [inicio], [fin], [descuento], [descripcion]
    FROM [dbo].[Oferta]
END

CREATE PROCEDURE InsertarOferta
    @inicio datetime,
    @fin datetime,
    @descuento int,
    @descripcion varchar(255),
    @nuevoID int OUTPUT -- Variable de salida para almacenar el nuevo ID
AS
BEGIN
    INSERT INTO [dbo].[Oferta]
           ([inicio]
           ,[fin]
           ,[descuento]
           ,[descripcion])
     VALUES
           (@inicio
           ,@fin
           ,@descuento
           ,@descripcion)
    
    -- Obtener el nuevo ID insertado
    SET @nuevoID = SCOPE_IDENTITY()
END

CREATE PROCEDURE BuscarTipoHabitacionPorOferta
    @IDBUSCAR INT
AS
BEGIN
    SELECT TH.id, TH.descripcion 
    FROM [dbo].[TipoHabitacion] TH
    JOIN [dbo].[OfertaTipoHabitacion] OTH ON TH.id = OTH.tipoHabitacionId
    WHERE OTH.ofertaId = @IDBUSCAR
END


