
$("#CPFBeneficiario").blur(function () {

    VerificacaoCPF($("#CPFBeneficiario").val(), "beneficiario", IdCliente);

});


$("#CPF").blur(function () {


    if (ehAlteracao) {

        if (cpfAlteracao == $("#CPF").val()) {
            checkCpfCliente = true;

        } else {
            VerificacaoCPF($("#CPF").val(), "cliente", null);
        }
    } else { // inclusão
        VerificacaoCPF($("#CPF").val(), "cliente", null);
    }

});






function VerificacaoCPF(_cpf, _consulta, _idCliente) {




    if (_cpf != null || _cpf != "") {


        var Dados = {
            cpf: _cpf,
            consulta: _consulta,
            idCliente: _idCliente,
        };


        $.ajax({
            url: '/Cliente/VerificaoCPF', // to get the right path to controller from TableRoutes of Asp.Net MVC
            dataType: "json", //to work with json format
            type: "POST", //to do a post request
            contentType: 'application/json; charset=utf-8', //define a contentType of your request
            cache: false, //avoid caching results
            data: JSON.stringify(Dados), // here you can pass arguments to your request if you need
            success: function (retornoCpf) {


                if (retornoCpf == "cpfExiste") { // cpf já existe na bbase de dados

                    MensagemErroTela('cpf', 'OPS! CPF digitado já estácadastrado', _consulta)
                    msgErro = "OPS! CPF digitado já estácadastrado";

                }
                else if (retornoCpf == "cpfInvalido") { // cpf é invalido

                    MensagemErroTela('cpf', 'OPS! CPF digitado é inválido', _consulta)
                    msgErro = "OPS! CPF digitado é inválido";
                }
                else if (retornoCpf == "cpfNulo") { // cpf é nulo
                    MensagemErroTela('cpf', 'Atenção! CPF tem que estar preenchido', _consulta);
                    msgErro = 'Atenção! CPF tem que estar preenchido';
                }
                else if (retornoCpf == "cpfOk") {

                    if (_consulta == "cliente") {
                        checkCpfCliente = true;

                    } else {
                        checkCpf = true;
                    }



                }
            }
        });
    } else {

        MensagemErroTela('cpf', 'Atenção! CPF tem que estar preenchido', _consulta);
    }

};