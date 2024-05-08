USE HotelPalm

CREATE PROCEDURE SeleccionarOferta
AS
BEGIN
    SELECT [id], [inicio], [fin], [descuento], [descripcion]
    FROM [dbo].[Oferta]
END
DROP PROCEDURE InsertarOferta
CREATE PROCEDURE InsertarOferta
    @inicio datetime,
    @fin datetime,
    @descuento int,
    @descripcion varchar(255),
    @nuevoID int OUTPUT -- Variable de salida para almacenar el nuevo ID
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

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
        SET @nuevoID = SCOPE_IDENTITY();

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Propagar el error
        THROW;
    END CATCH
END
--
drop PROCEDURE BuscarTipoHabitacionPorOferta
CREATE PROCEDURE BuscarTipoHabitacionPorOferta
    @IDBUSCAR INT
AS
BEGIN
    SELECT TH.id, TH.nombre 
    FROM [dbo].[TipoHabitacion] TH
    JOIN [dbo].[OfertaTipoHabitacion] OTH ON TH.id = OTH.tipoHabitacionId
    WHERE OTH.ofertaId = @IDBUSCAR
END

select * from oferta 
sele
select * from [dbo].[TipoHabitacion] TH


CREATE PROCEDURE InsertarOfertaTipoHabitacion
    @ofertaId int,
    @tipoHabitacionId int
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Insertar en la tabla OfertaTipoHabitacion
        INSERT INTO [HotelPalm].[dbo].[OfertaTipoHabitacion] ([ofertaId], [tipoHabitacionId])
        VALUES (@ofertaId, @tipoHabitacionId);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Propagar el error
        THROW;
    END CATCH
END


CREATE PROCEDURE ActualizarOferta
    @ofertaId int,
    @inicio datetime,
    @fin datetime,
    @descuento int,
    @descripcion varchar(255)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Actualizar la oferta en la tabla Oferta
        UPDATE [HotelPalm].[dbo].[Oferta]
        SET [inicio] = @inicio,
            [fin] = @fin,
            [descuento] = @descuento,
            [descripcion] = @descripcion
        WHERE [id] = @ofertaId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Propagar el error
        THROW;
    END CATCH
END

CREATE PROCEDURE EliminarRelacionOfertaTipoHabitacion
    @ofertaId int
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Eliminar todas las relaciones entre la oferta y los tipos de habitación asociados
        DELETE FROM [HotelPalm].[dbo].[OfertaTipoHabitacion]
        WHERE [ofertaId] = @ofertaId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Propagar el error
        THROW;
    END CATCH
END



CREATE PROCEDURE EliminarOferta
    @ofertaId int
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Eliminar la oferta
        DELETE FROM [HotelPalm].[dbo].[Oferta]
        WHERE [id] = @ofertaId;

        -- Eliminar todas las relaciones asociadas en la tabla OfertaTipoHabitacion
        DELETE FROM [HotelPalm].[dbo].[OfertaTipoHabitacion]
        WHERE [ofertaId] = @ofertaId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Propagar el error
        THROW;
    END CATCH
END
--
CREATE PROCEDURE SeleccionarOfertaPorFecha
    @fechaInicio DATETIME,
    @fechaFin DATETIME
AS
BEGIN
    SELECT [id], [inicio], [fin], [descuento], [descripcion]
    FROM [dbo].[Oferta]
    WHERE [inicio] BETWEEN @fechaInicio AND @fechaFin
        OR [fin] BETWEEN @fechaInicio AND @fechaFin
        OR ([inicio] <= @fechaInicio AND [fin] >= @fechaFin);
END;
