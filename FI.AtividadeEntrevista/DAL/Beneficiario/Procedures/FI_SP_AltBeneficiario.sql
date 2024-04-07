CREATE PROCEDURE FI_SP_AltBeneficiario
    @ID BIGINT,
    @NOME NVARCHAR(100),
    @CPF CHAR(14),
    @IDCLIENTE BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Atualiza os dados do beneficiário com o ID especificado
        UPDATE BENEFICIARIOS
        SET NOME = @NOME,
            CPF = @CPF,
            IDCLIENTE = @IDCLIENTE
        WHERE ID = @ID;
    END TRY
    BEGIN CATCH
        -- Se ocorrer algum erro, lança uma exceção
        THROW;
    END CATCH;
END;
