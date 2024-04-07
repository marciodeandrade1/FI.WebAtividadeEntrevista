using System.Collections.Generic;
using System.Data;
using FI.AtividadeEntrevista.DML;
using System.Data.SqlClient;

namespace FI.AtividadeEntrevista.DAL
{
    internal class DaoBeneficiario : AcessoDados
    {

        internal long Incluir(Beneficiarios Beneficiario)
        {
            List<SqlParameter> parametros = new List<SqlParameter>();

            parametros.Add(new SqlParameter("NOME", Beneficiario.Nome));
            parametros.Add(new SqlParameter("CPF", Beneficiario.CPF));
            parametros.Add(new SqlParameter("IDCLIENTE", Beneficiario.IdCliente));

            DataSet ds = base.Consultar("FI_SP_IncBeneficiario", parametros);
            long ret = 0;
            if (ds.Tables[0].Rows.Count > 0)
                long.TryParse(ds.Tables[0].Rows[0][0].ToString(), out ret);
            return ret;
        }

        internal void Alterar(Beneficiarios Beneficiario)
        {
            List<SqlParameter> parametros = new List<SqlParameter>();

            parametros.Add(new SqlParameter("NOME", Beneficiario.Nome));
            parametros.Add(new SqlParameter("CPF", Beneficiario.CPF));
            parametros.Add(new SqlParameter("IDCLIENTE", Beneficiario.IdCliente));
            parametros.Add(new SqlParameter("ID", Beneficiario.Id));

            base.Executar("FI_SP_AltBeneficiario", parametros);
        }

        internal void Excluir(long Id)
        {
            List<SqlParameter> parametros = new List<SqlParameter>();
            parametros.Add(new SqlParameter("ID", Id));
            base.Executar("FI_SP_DelBeneficiario", parametros);
        }

        internal List<Beneficiarios> Listar(long IdCliente)
        {
            List<SqlParameter> parametros = new List<SqlParameter>();
            parametros.Add(new SqlParameter("IDCLIENTE", IdCliente));
            DataSet ds = base.Consultar("FI_SP_ConsBeneficiario", parametros);
            List<Beneficiarios> cli = Converter(ds);
            return cli;
        }

        private List<Beneficiarios> Converter(DataSet ds)
        {
            List<Beneficiarios> lista = new List<Beneficiarios>();
            if (ds != null && ds.Tables != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    Beneficiarios item = new Beneficiarios();
                    item.Id = row.Field<long>("Id");
                    item.Nome = row.Field<string>("Nome");
                    item.CPF = row.Field<string>("CPF");
                    lista.Add(item);
                }
            }
            return lista;
        }
    }
}
