using FI.AtividadeEntrevista.DML;
using FI.AtividadeEntrevista.DAL;
using System.Collections.Generic;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiarios
    {
        public List<Beneficiarios> ListaBeneficiarios(int id)
        {
            DaoBeneficiarios ben = new DaoBeneficiarios();
            return ben.ListaBeneficiarios(id);
        }
        public bool VerificarExistencia(string cpf, int? idCliente)
        {
            DaoBeneficiarios ben = new DaoBeneficiarios();
            return ben.VerificarExistencia(cpf, idCliente);
        }
    }
}
