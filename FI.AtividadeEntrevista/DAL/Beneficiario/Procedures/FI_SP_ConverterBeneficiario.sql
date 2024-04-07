CREATE PROCEDURE FI_SP_ConverterBeneficiario
    @IDCLIENTE BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    -- Seleciona os beneficiários do cliente especificado
    SELECT 
        Id,
        Nome,
        CPF
    FROM 
        BENEFICIARIOS
    WHERE 
        IDCLIENTE = @IDCLIENTE;
END;
