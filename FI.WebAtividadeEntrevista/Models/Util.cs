using System;

namespace WebAtividadeEntrevista.Models
{
    public class Util
    {
        #region [ Valida CPF ]
        /// <summary>
        /// Método que valida o cpf do cadastro
        /// </summary>
        /// <param name="vrCPF">Recebe o parametro do TextBox do formulário "Campo MaskCPF"</param>
        /// <returns>Retorna um valor boleano Verdadeiro ou Falso da validação</returns>
        public bool ValidaCPF(string vrCPF)
        {
            string valor = vrCPF.Replace(".", "");
            valor = valor.Replace("-", "");

            if (valor.Length != 11) return false;
            bool igual = true;
            for (int i = 1; i < 11 && igual; i++)

                if (valor[i] != valor[0])
                    igual = false;
            if (igual || valor == "12345678909")
                return false;

            int[] numeros = new int[11];
            for (int i = 0; i < 11; i++)
                numeros[i] = int.Parse(valor[i].ToString());
            int soma = 0;

            for (int i = 0; i < 9; i++)
                soma += (10 - i) * numeros[i];
            int resultado = soma % 11;
            if (resultado == 1 || resultado == 0)
            {
                if (numeros[9] != 0) return false;
            }
            else if (numeros[9] != 11 - resultado) return false;
            soma = 0;
            for (int i = 0; i < 10; i++) soma += (11 - i) * numeros[i];
            resultado = soma % 11;
            if (resultado == 1 || resultado == 0)
            {
                if (numeros[10] != 0) return false;
            }
            else if (numeros[10] != 11 - resultado) return false;
            return true;
        }
        #endregion
        #region [ Valida CNPJ ]
        /// <summary>
        /// Método que valida o CNPJ do cadastro
        /// </summary>
        /// <param name="vrCNPJ">Recebe o parametro do TextBox do formulário "campo MaskCNPJ"</param>
        /// <returns>Retorna um valor boleano Verdadeiro ou Falso da validação</returns>
        public bool ValidaCNPJ(string vrCNPJ)
        {
            string CNPJ = vrCNPJ.Replace(".", ""); // remove os pontos do cnpj
            CNPJ = CNPJ.Replace("/", ""); // remove o / do cnpj
            CNPJ = CNPJ.Replace("-", "");// remove o traço do cnpj
            // faz os cálculos para a validação
            int[] digitos, soma, resultado;
            int nrDig;
            string ftmt;
            bool[] CNPJOk;
            ftmt = "6543298765432";
            digitos = new int[14];
            soma = new int[2];
            soma[0] = 0;
            soma[1] = 0;
            resultado = new int[2];
            resultado[0] = 0;
            resultado[1] = 0;
            CNPJOk = new bool[2];
            CNPJOk[0] = false;
            CNPJOk[1] = false;
            try
            {
                for (nrDig = 0; nrDig < 14; nrDig++)
                {
                    digitos[nrDig] = int.Parse(CNPJ.Substring(nrDig, 1));
                    if (nrDig <= 11)
                    {
                        soma[0] += (digitos[nrDig] * int.Parse(ftmt.Substring(nrDig + 1, 1)));
                    }
                    if (nrDig <= 12)
                    {
                        soma[1] += (digitos[nrDig] * int.Parse(ftmt.Substring(nrDig, 1)));
                    }
                }
                for (nrDig = 0; nrDig < 2; nrDig++)
                {
                    resultado[nrDig] = (soma[nrDig] % 11);
                    if ((resultado[nrDig] == 0) || (resultado[nrDig] == 1))
                    {
                        CNPJOk[nrDig] = (digitos[12 + nrDig] == 0);
                    }
                    else
                    {
                        CNPJOk[nrDig] = (digitos[12 + nrDig] == (11 - resultado[nrDig]));
                    }
                }
                return (CNPJOk[0] && CNPJOk[1]);
            }
            catch
            {
                return false;
            }
        }
        #endregion
        #region [ Remove a máscara de um CPF ou CNPJ ]
        /// <summary>
        /// Retira a Formatacao de uma string CNPJ/CPF
        /// </summary>
        /// <param name="Codigo">Recebe uma string Codigo com mascara</param>
        /// <returns>string sem máscara</returns>
        /// <example>Recebe '99.999.999/9999-99' Devolve '99999999999999'</example>
        public string SemFormatacao(string Codigo)
        {
            if (Codigo != null)
            {
                return Codigo.Replace(".", string.Empty).Replace("-", string.Empty).Replace("/", string.Empty);
            }
            return Codigo = "";
        }
        #endregion
        #region  [ Colocar a mascara no CPF ou CNPJ ]
        /// <summary>
        /// Formata uma string CPF 
        ///  Formata uma string CNPJ 
        ///  Informar uma string com o codigo do CNPJ ou CPF 
        /// </summary>
        /// <param name="CnpjCpf"></param>
        /// <returns>Retorna '99.999.999/9999-99' ou '111.222.333-44' </returns>
        public string FormatarCnpjCpf(string CnpjCpf)
        {
            //  var entradaCpfCnpj = Convert.ToUInt64(CnpjCpf);
            if (CnpjCpf != null && CnpjCpf != "")
            {
                if (CnpjCpf.Length > 12)
                {
                    return Convert.ToUInt64(CnpjCpf).ToString(@"00\.000\.000\/0000\-00");
                }
                else
                {
                    return Convert.ToUInt64(CnpjCpf).ToString(@"000\.000\.000\-00");
                }
            }
            else
            {
                return null;
            }
        }
        #endregion
    }
}