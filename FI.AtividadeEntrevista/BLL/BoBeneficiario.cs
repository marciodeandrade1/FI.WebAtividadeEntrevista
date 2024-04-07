using FI.AtividadeEntrevista.DAL;
using FI.AtividadeEntrevista.DML;
using System.Collections.Generic;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        private DaoBeneficiario DAO = new DaoBeneficiario();
        public long Incluir(Beneficiarios beneficiarios)
        {
            return DAO.Incluir(beneficiarios);
        }
        public void Alterar(Beneficiarios beneficiarios)
        {
            DAO.Alterar(beneficiarios);
        }
        public void Excluir(long id)
        {
            DAO.Excluir(id);
        }
        public List<Beneficiarios> Consultar(long IdCliente)
        {
            return DAO.Listar(IdCliente);
        }
    }
}
