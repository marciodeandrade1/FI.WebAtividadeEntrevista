
var idLinha = 0
var id = 0;
var alterar = false;
var retornoVerificacao = true;

function IncluirRegistro(tipo) {

    $('#modal_beneficiario').modal('show');

};
$("#btnfechar").click(function () {

    $('#modal_beneficiario').modal('hide')
    LimparDados();

});




$("#btn_Incluirbeneficiario").click(function () {





    if (alterar) {

        //   retornoVerificacao = VerificacaoCPF($("#CPFBeneficiario").val());
        if (retornoVerificacao) {
            $("#CPF" + idLinha).html($("#CPFBeneficiario").val());
            $("#NOME" + idLinha).html($("#NomeBenificiario").val());

            if ($("#acaoItem" + idLinha).html() == "S") {
                $("#acaoItem" + idLinha).html("A");
            }

            LimparDados();
            alterar = false;
        }



    } else {



        var cpf = "";
        var nome = "";

        var dados = {

            cpf: $("#CPFBeneficiario").val().replace(/\s/g, ''),
            nome: $("#NomeBenificiario").val().replace(/\s/g, ''),
        };


        // verifica se os campos cpf e nome estão preenchidos e se passou
        if (dados.cpf != "" && dados.nome != "") {

            criar_linhaGridBeneficiario(dados);

        } else {

            MensagemErroTela('cpf', 'OPS! CPF e nome são obrigatórios')
        }


    }


});




function criar_linhaGridBeneficiario(dadosLinha) {


    var verificarCpfCadastrado = CpfJaCadastrado(dadosLinha.cpf);


    if (checkCpf) { // verifica se o cpf é invalido ou se existe

        if (!verificarCpfCadastrado) {

            id = "0" + id + 1

            $("#grid_Beneficiarios").append(
                "<tr class = 'itensBeneficiario'>" +
                "    <td id='id" + id + "' class= 'invisivel idbeneficiario'>" + id + "</td>" +
                "    <td id='CPF" + id + "' class = 'cpfBeneficiario'>" + dadosLinha.cpf + "</td>" +
                "    <td id='NOME" + id + "' class = 'nomeBeneficiario'>" + dadosLinha.nome + "</td>" +
                "    <td id='acaoItem" + id + "' class = 'invisivel acaoDoItem'>" + "I" + "</td>" +
                "    <td>" +
                " <a class='btn btn-primary btn-sm btn_alterarLinhaBeneficiario' id=" + id + " role='button'><i class='far fa-edit'></i> Alterar</a>" +
                " <a class='btn btn-primary btn-sm btn_excluirLinhaBeneficiario' id=" + id + " role='button'><i class='far fa-trash-alt'></i> Excluir</a>" +
                "</td>" +

                "</tr>"
            );


            LimparDados();


        } else {
            MensagemErroTela('cpf', 'OPS! CPF já cadastrado')
        }
    } else {

        MensagemErroTela('cpf', msgErro)


    }




};


// função para mostrar msg erro na tela 
function MensagemErroTela(tipo, mensagem, consulta) {


    if (consulta == "cliente") {

        if (tipo == 'cpf') {
            // $("#erroCPF").css("display", "block");
            $("#erroCPFCliente").slideDown(1000);
            $("#msgCPFCliente").html(mensagem);

            checkCpfCliente = false;

            $().ready(function () {
                setTimeout(function () {
                    //  $('#erroCPF').hide(); 
                    $('#erroCPFCliente').slideUp(1000);
                    $("#msgCPFCliente").val("");
                }, 3000); // O valor é representado em milisegundos.
            });
        }
    } else {

        if (tipo == 'cpf') {
            // $("#erroCPF").css("display", "block");
            $("#erroCPF").slideDown(1000);
            $("#msgCPF").html(mensagem);

            checkCpf = false;

            $().ready(function () {
                setTimeout(function () {
                    //  $('#erroCPF').hide(); 
                    $('#erroCPF').slideUp(1000);
                    $("#msgCPF").val("");
                }, 3000); // O valor é representado em milisegundos.
            });
        }
    }

}



$(document).on('click', '.btn_alterarLinhaBeneficiario', function () {

    alterar = true;
    $("#nomeBotao").html("Salvar");
    idLinha = $(this).attr("id");
    var btn = $(this);

    $("#CPFBeneficiario").val(btn.closest("td").siblings("#CPF" + idLinha).text());
    $("#NomeBenificiario").val(btn.closest("td").siblings("#NOME" + idLinha).text());

});



$(document).on('click', '.btn_excluirLinhaBeneficiario', function () {

    var btn = $(this);
    //alert(btn);
    var idLinha = $(this).attr("id");
    //alert(idLinha);

    $('#delete').modal('show');

    $(document).on('click', '.excluir-trigger', function () {


        tr = btn.closest('tr'); // pego a minha linha  

        if ($("#acaoItem" + idLinha).html() == "I") {
            tr.remove(); // remove a linha antes de ser criada

        } else {
            //acaoItem_15
            $("#acaoItem" + idLinha).html("E"); // mudar o status da linha para "E" para excluir
            tr.hide(); // esconde a linha 
        }




    });

});


// função para verificar se o cpf já esta cadastrado no grid
function CpfJaCadastrado(cpf) {

    cpfExiste = false;

    $('#grid_Beneficiarios tr').not(":first").each(function (index) {


        if ($(this).find('.cpfBeneficiario').text() != "" && $(this).find('.acaoDoItem').text() != "E") {

            var cpfCadastrado = ($(this).find('.cpfBeneficiario').text());

            if (cpfCadastrado == cpf) {

                cpfExiste = true;
            }



        }
    });


    return cpfExiste;

};



// função limpar campos
function LimparDados() {


    $("#CPFBeneficiario").val("");
    $("#NomeBenificiario").val("");
    $("#nomeBotao").html("Incluir");



}
