CREATE PROCEDURE FI_SP_IncBeneficiario
    @NOME NVARCHAR(100),
    @CPF CHAR(14),
    @IDCLIENTE BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @BeneficiarioId BIGINT;

    -- Verifica se o CPF já está cadastrado para o mesmo cliente
    IF EXISTS (SELECT 1 FROM BENEFICIARIOS WHERE CPF = @CPF AND IDCLIENTE = @IDCLIENTE)
    BEGIN
        RAISERROR ('CPF já cadastrado para este cliente.', 16, 1);
        RETURN;
    END;

    BEGIN TRY
        -- Inserção do novo beneficiário
        INSERT INTO BENEFICIARIOS (NOME, CPF, IDCLIENTE)
        VALUES (@NOME, @CPF, @IDCLIENTE);

        -- Obtém o ID do beneficiário inserido
        SET @BeneficiarioId = SCOPE_IDENTITY();

        SELECT @BeneficiarioId AS BeneficiarioId;
    END TRY
    BEGIN CATCH
        -- Se ocorrer algum erro, retorna 0
        SELECT 0 AS BeneficiarioId;
    END CATCH;
END;
