use HotelPalm
CREATE PROCEDURE VerificarDisponibilidad
    @fecha_verificacion DATE
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION; -- Inicia la transacción
        
        -- Declara la fecha de verificación
        -- Realiza la consulta para verificar la disponibilidad de las habitaciones
        SELECT 
            H.ID,
            H.numero,
            H.activo,
            TH.nombre,
            CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM [dbo].[ReservaHabitacion] RH
                    JOIN [dbo].[Reserva] R ON RH.reservaId = R.id
                    WHERE RH.habitacionId = H.ID
                    AND @fecha_verificacion >= R.checkIn
                    AND @fecha_verificacion < R.checkOut
                ) THEN 'false'
                ELSE 'true'
            END AS Disponible
        FROM 
            [dbo].[Habitacion] H
        JOIN 
            [dbo].[TipoHabitacion] TH ON TH.id = H.tipoHabitacionId;

        COMMIT; -- Confirma la transacción
    END TRY
    BEGIN CATCH
        -- Si ocurre algún error, realiza un rollback para deshacer la transacción
        IF @@TRANCOUNT > 0
            ROLLBACK;
        -- Puedes agregar aquí cualquier otra lógica para manejar errores
    END CATCH
END;