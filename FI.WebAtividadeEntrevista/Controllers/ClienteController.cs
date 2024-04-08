using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class ClienteController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Incluir()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Incluir(ClienteModel model)
        {
            BoCliente bo = new BoCliente();
            List<Beneficiarios> ListaBeneficiarios = new List<Beneficiarios>();
            if (model.ListaBeneficiarios != null)
            {
                foreach (var item in model.ListaBeneficiarios)
                {
                    //remove mascara do cpf
                    item.CPF = new Util().SemFormatacao(item.CPF);

                    var obj = new Beneficiarios
                    {
                        CPF = item.CPF,
                        Nome = item.Nome,
                    };
                    ListaBeneficiarios.Add(obj);
                }
            }
            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();
                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                //remove mascara do cpf
                model.CPF = new Util().SemFormatacao(model.CPF);
                model.Id = bo.Incluir(new Cliente()
                {
                    CEP = model.CEP,
                    Cidade = model.Cidade,
                    Email = model.Email,
                    Estado = model.Estado,
                    Logradouro = model.Logradouro,
                    Nacionalidade = model.Nacionalidade,
                    Nome = model.Nome,
                    Sobrenome = model.Sobrenome,
                    Telefone = model.Telefone,
                    CPF = model.CPF,
                    ListaBeneficiarios = ListaBeneficiarios
                });
                return Json("Cadastro efetuado com sucesso");
            }
        }
        [HttpPost]
        public JsonResult Alterar(ClienteModel model)
        {
            BoCliente bo = new BoCliente();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();
                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                List<Beneficiarios> ListaBeneficiarios = new List<Beneficiarios>();
                if (model.ListaBeneficiarios != null)
                {
                    foreach (var item in model.ListaBeneficiarios)
                    {
                        //remove mascara do cpf
                        item.CPF = new Util().SemFormatacao(item.CPF);
                        var obj = new Beneficiarios
                        {
                            CPF = item.CPF,
                            Nome = item.Nome,
                            AcaoDoItem = item.AcaoDoItem,
                            Id = item.ID,
                        };
                        ListaBeneficiarios.Add(obj);
                    }
                }
                //remove mascara do cpf
                model.CPF = new Util().SemFormatacao(model.CPF);
                bo.Alterar(new Cliente()
                {
                    Id = model.Id,
                    CEP = model.CEP,
                    Cidade = model.Cidade,
                    Email = model.Email,
                    Estado = model.Estado,
                    Logradouro = model.Logradouro,
                    Nacionalidade = model.Nacionalidade,
                    Nome = model.Nome,
                    Sobrenome = model.Sobrenome,
                    Telefone = model.Telefone,
                    CPF = model.CPF,
                    ListaBeneficiarios = ListaBeneficiarios
                });
                return Json("Cadastro alterado com sucesso");
            }
        }
        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoCliente bo = new BoCliente();
            Cliente cliente = bo.Consultar(id);
            ClienteModel model = null;
            if (cliente != null)
            {
                cliente.CPF = new Util().FormatarCnpjCpf(cliente.CPF);
                model = new ClienteModel()
                {
                    Id = cliente.Id,
                    CEP = cliente.CEP,
                    Cidade = cliente.Cidade,
                    Email = cliente.Email,
                    Estado = cliente.Estado,
                    Logradouro = cliente.Logradouro,
                    Nacionalidade = cliente.Nacionalidade,
                    Nome = cliente.Nome,
                    Sobrenome = cliente.Sobrenome,
                    Telefone = cliente.Telefone,
                    CPF = cliente.CPF
                };
            }
            return View(model);
        }
        [HttpPost]
        public JsonResult ClienteList(int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split(' ');
                if (array.Length > 0)
                    campo = array[0];
                if (array.Length > 1)
                    crescente = array[1];
                List<Cliente> clientes = new BoCliente().Pesquisa(jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), out qtd);
                //Return result to jTable
                return Json(new { Result = "OK", Records = clientes, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
        [HttpPost]
        public JsonResult VerificaoCPF(string cpf, string consulta, int? idCliente)
        {
            var retornoCpfExiste = false;
            if (cpf != null)
            {
                var validacaoCpf = new Util().ValidaCPF(cpf);
                if (validacaoCpf)
                {
                    BoCliente bo = new BoCliente();
                    BoBeneficiarios be = new BoBeneficiarios();
                    cpf = new Util().SemFormatacao(cpf);
                    if (consulta == "cliente")
                    {
                        retornoCpfExiste = bo.VerificarExistencia(cpf); // ver se existe beneficiário no banco de dados
                    }
                    else // Beneficiario
                    {
                        if (idCliente != null && idCliente != 0)
                        {
                            retornoCpfExiste = be.VerificarExistencia(cpf, idCliente); // ver se existe beneficiário no banco de dados
                        }
                        else
                        {
                            retornoCpfExiste = false;
                        }

                    }
                    if (retornoCpfExiste)
                    {
                        return Json("cpfExiste", JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json("cpfOk", JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    return Json("cpfInvalido", JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json("cpfNulo", JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult ListaBeneficiarios(int id)
        {
            BoBeneficiarios bo = new BoBeneficiarios();
            List<Beneficiarios> listaBeneficiarios = bo.ListaBeneficiarios(id);
            List<BeneficiarioModel> listaBeneficiariosModel = new List<BeneficiarioModel>();
            if (listaBeneficiarios != null)
            {
                foreach (var item in listaBeneficiarios)
                {
                    item.CPF = new Util().FormatarCnpjCpf(item.CPF);
                    var ben = new BeneficiarioModel
                    {
                        CPF = item.CPF,
                        Nome = item.Nome,
                        ID = item.Id,
                        //IDCLIENTE = item.IDCLIENTE,
                    };
                    listaBeneficiariosModel.Add(ben);
                }
            }
            return Json(listaBeneficiariosModel);
        }
    }
}