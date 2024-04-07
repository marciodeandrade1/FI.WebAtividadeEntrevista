CREATE PROCEDURE FI_SP_DelBeneficiario
    @ID BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Exclui o beneficiário com o ID especificado
        DELETE FROM BENEFICIARIOS
        WHERE ID = @ID;
    END TRY
    BEGIN CATCH
        -- Se ocorrer algum erro, lança uma exceção
        THROW;
    END CATCH;
END;
