use HotelPalm
CREATE PROCEDURE VerificarDisponibilidad
    @fecha_verificacion DATE
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION; -- Inicia la transacci�n
        
        -- Declara la fecha de verificaci�n
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

        COMMIT; -- Confirma la transacci�n
    END TRY
    BEGIN CATCH
        -- Si ocurre alg�n error, realiza un rollback para deshacer la transacci�n
        IF @@TRANCOUNT > 0
            ROLLBACK;
        -- Puedes agregar aqu� cualquier otra l�gica para manejar errores
    END CATCH
END;