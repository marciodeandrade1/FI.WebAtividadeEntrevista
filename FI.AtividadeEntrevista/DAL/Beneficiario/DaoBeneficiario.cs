using FI.AtividadeEntrevista.DML;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace FI.AtividadeEntrevista.DAL
{
    internal class DaoBeneficiarios : AcessoDados
    {
        /// <summary>
        /// Inclui um novo cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        internal List<Beneficiarios> ListaBeneficiarios(long Id)
        {
            List<SqlParameter> parametros = new List<SqlParameter>
            {
                new SqlParameter("Id", Id)
            };
            DataSet ds = base.Consultar("FI_SP_ConsBeneficiario", parametros);
            List<Beneficiarios> ben = Converter(ds);

            return ben.ToList();
        }
        internal bool VerificarExistencia(string cpf, int? idCliente)
        {
            if (idCliente != null)
            {
                List<SqlParameter> parametros = new List<SqlParameter>
                {
                    new SqlParameter("CPF", cpf),
                    new SqlParameter("IDCLIENTE", idCliente)
                };
                DataSet ds = base.Consultar("FI_SP_VerificaCpfBeneficiario", parametros);

                return ds.Tables[0].Rows.Count > 0;
            }
            else
            {
                return false;
            }
        }
        private List<Beneficiarios> Converter(DataSet ds)
        {
            List<Beneficiarios> lista = new List<Beneficiarios>();
            if (ds != null && ds.Tables != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    Beneficiarios ben = new Beneficiarios
                    {
                        Id = row.Field<long>("Id"),
                        Nome = row.Field<string>("Nome"),
                        CPF = row.Field<string>("CPF"),

                    };
                    lista.Add(ben);
                }
            }
            return lista;
        }
    }
}
