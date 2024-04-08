using FI.AtividadeEntrevista.DML;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace FI.AtividadeEntrevista.DAL
{
    /// <summary>
    /// Classe de acesso a dados de Cliente
    /// </summary>
    internal class DaoCliente : AcessoDados
    {
        /// <summary>
        /// Inclui um novo cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        internal long Incluir(Cliente cliente)
        {
            List<SqlParameter> parametros = new List<SqlParameter>
            {
                new SqlParameter("Nome", cliente.Nome),
                new SqlParameter("Sobrenome", cliente.Sobrenome),
                new SqlParameter("Nacionalidade", cliente.Nacionalidade),
                new SqlParameter("CEP", cliente.CEP),
                new SqlParameter("Estado", cliente.Estado),
                new SqlParameter("Cidade", cliente.Cidade),
                new SqlParameter("Logradouro", cliente.Logradouro),
                new SqlParameter("Email", cliente.Email),
                new SqlParameter("Telefone", cliente.Telefone),
                new SqlParameter("CPF", cliente.CPF)
            };

            DataSet ds = base.Consultar("FI_SP_IncClienteV2", parametros);
            long ret = 0;
            if (ds.Tables[0].Rows.Count > 0)
                long.TryParse(ds.Tables[0].Rows[0][0].ToString(), out ret);

            if (cliente.ListaBeneficiarios != null && ret > 0)
            {

                foreach (var item in cliente.ListaBeneficiarios)
                {
                    List<SqlParameter> parametros1 = new List<SqlParameter>();

                    parametros1.Add(new SqlParameter("CPF", item.CPF));
                    parametros1.Add(new SqlParameter("NOME", item.Nome));
                    parametros1.Add(new SqlParameter("IDCLIENTE", ret));

                    base.Consultar("FI_SP_IncBeneficiario", parametros1);
                }
            }
            return ret;
        }

        /// <summary>
        /// Inclui um novo cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        internal Cliente Consultar(long Id)
        {
            List<SqlParameter> parametros = new List<SqlParameter>();

            parametros.Add(new SqlParameter("Id", Id));

            DataSet ds = base.Consultar("FI_SP_ConsCliente", parametros);
            List<Cliente> cli = Converter(ds);

            return cli.FirstOrDefault();
        }
        internal bool VerificarExistencia(string CPF)
        {
            List<SqlParameter> parametros = new List<SqlParameter>();

            parametros.Add(new SqlParameter("CPF", CPF));

            DataSet ds = base.Consultar("FI_SP_VerificaCliente", parametros);

            return ds.Tables[0].Rows.Count > 0;
        }
        internal List<Cliente> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            List<SqlParameter> parametros = new List<SqlParameter>();

            parametros.Add(new SqlParameter("iniciarEm", iniciarEm));
            parametros.Add(new SqlParameter("quantidade", quantidade));
            parametros.Add(new SqlParameter("campoOrdenacao", campoOrdenacao));
            parametros.Add(new SqlParameter("crescente", crescente));

            DataSet ds = base.Consultar("FI_SP_PesqCliente", parametros);
            List<Cliente> cli = Converter(ds);

            int iQtd = 0;

            if (ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
                int.TryParse(ds.Tables[1].Rows[0][0].ToString(), out iQtd);
            qtd = iQtd;

            return cli;
        }
        /// <summary>
        /// Lista todos os clientes
        /// </summary>
        internal List<Cliente> Listar()
        {
            List<SqlParameter> parametros = new List<SqlParameter>();

            parametros.Add(new SqlParameter("Id", 0));

            DataSet ds = base.Consultar("FI_SP_ConsCliente", parametros);
            List<Cliente> cli = Converter(ds);

            return cli;
        }

        /// <summary>
        /// Inclui um novo cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        internal void Alterar(Cliente cliente)
        {
            List<SqlParameter> parametros = new List<SqlParameter>();

            parametros.Add(new SqlParameter("Nome", cliente.Nome));
            parametros.Add(new SqlParameter("Sobrenome", cliente.Sobrenome));
            parametros.Add(new SqlParameter("Nacionalidade", cliente.Nacionalidade));
            parametros.Add(new SqlParameter("CEP", cliente.CEP));
            parametros.Add(new SqlParameter("Estado", cliente.Estado));
            parametros.Add(new SqlParameter("Cidade", cliente.Cidade));
            parametros.Add(new SqlParameter("Logradouro", cliente.Logradouro));
            parametros.Add(new SqlParameter("Email", cliente.Email));
            parametros.Add(new SqlParameter("Telefone", cliente.Telefone));
            parametros.Add(new SqlParameter("ID", cliente.Id));
            parametros.Add(new SqlParameter("CPF", cliente.CPF));

            base.Executar("FI_SP_AltCliente", parametros);


            if (cliente.ListaBeneficiarios != null && cliente.Id > 0)
            {

                foreach (var item in cliente.ListaBeneficiarios)
                {
                    List<SqlParameter> parametros1 = new List<SqlParameter>();

                    switch (item.AcaoDoItem)
                    {

                        case "A":
                            parametros1.Add(new SqlParameter("CPF", item.CPF));
                            parametros1.Add(new SqlParameter("NOME", item.Nome));
                            parametros1.Add(new SqlParameter("@Id", item.Id));

                            base.Executar("FI_SP_AltBeneficiario", parametros1);
                            break;
                        case "I":
                            parametros1.Add(new SqlParameter("CPF", item.CPF));
                            parametros1.Add(new SqlParameter("NOME", item.Nome));
                            parametros1.Add(new SqlParameter("IDCLIENTE", cliente.Id));

                            base.Consultar("FI_SP_IncBeneficiario", parametros1);
                            break;
                        case "E":
                            // parametros.Add(new System.Data.SqlClient.SqlParameter("Id", item.Id));
                            parametros1.Add(new SqlParameter("ID", item.Id));
                            base.Executar("FI_SP_DelBeneficiario", parametros1);

                            break;
                        case "S": // sem nenhum tipo de ação

                            break;
                        default:
                            break;
                    }

                }
            }
        }
        /// <summary>
        /// Excluir Cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        internal void Excluir(long Id)
        {
            List<SqlParameter> parametros = new List<SqlParameter>();

            parametros.Add(new SqlParameter("Id", Id));

            base.Executar("FI_SP_DelCliente", parametros);
        }

        private List<Cliente> Converter(DataSet ds)
        {
            List<Cliente> lista = new List<Cliente>();
            if (ds != null && ds.Tables != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    Cliente cli = new Cliente();
                    cli.Id = row.Field<long>("Id");
                    cli.CEP = row.Field<string>("CEP");
                    cli.Cidade = row.Field<string>("Cidade");
                    cli.Email = row.Field<string>("Email");
                    cli.Estado = row.Field<string>("Estado");
                    cli.Logradouro = row.Field<string>("Logradouro");
                    cli.Nacionalidade = row.Field<string>("Nacionalidade");
                    cli.Nome = row.Field<string>("Nome");
                    cli.Sobrenome = row.Field<string>("Sobrenome");
                    cli.Telefone = row.Field<string>("Telefone");
                    cli.CPF = row.Field<string>("CPF");
                    lista.Add(cli);
                }
            }

            return lista;
        }
    }
}
