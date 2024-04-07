CREATE PROCEDURE FI_SP_ConsBeneficiario
    @IDCLIENTE BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    -- Selecione os beneficiários do cliente especificado
    SELECT ID, NOME, CPF
    FROM BENEFICIARIOS
    WHERE IDCLIENTE = @IDCLIENTE;
END;
