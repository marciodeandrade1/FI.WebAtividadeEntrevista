
$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);


        carregarBeneficiarios(obj.Id);
        IdCliente = parseInt(obj.Id);
        ehAlteracao = true;
        cpfAlteracao = obj.CPF;
        checkCpfCliente = true;

    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();


        if (checkCpfCliente) {

            var ListaBeneficiarios = new Array();

            $('#grid_Beneficiarios tr').not(":first").each(function () {

                ListaBeneficiarios.push({

                    ID: $(this).find('.idbeneficiario').text(),
                    CPF: $(this).find('.cpfBeneficiario').text(),
                    Nome: $(this).find('.nomeBeneficiario').text(),
                    AcaoDoItem: $(this).find('.acaoDoItem').text(),
                });

                return ListaBeneficiarios;
            });

            $.ajax({
                url: urlPost,
                method: "POST",
                data: {
                    "NOME": $(this).find("#Nome").val(),
                    "CEP": $(this).find("#CEP").val(),
                    "Email": $(this).find("#Email").val(),
                    "Sobrenome": $(this).find("#Sobrenome").val(),
                    "Nacionalidade": $(this).find("#Nacionalidade").val(),
                    "Estado": $(this).find("#Estado").val(),
                    "Cidade": $(this).find("#Cidade").val(),
                    "Logradouro": $(this).find("#Logradouro").val(),
                    "Telefone": $(this).find("#Telefone").val(),
                    "CPF": $(this).find("#CPF").val(),
                    ListaBeneficiarios
                },
                error:
                    function (r) {
                        if (r.status == 400)
                            ModalDialog("Ocorreu um erro", r.responseJSON);
                        else if (r.status == 500)
                            ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                    },
                success:
                    function (r) {
                        ModalDialog("Sucesso!", r)
                        $("#formCadastro")[0].reset();
                        window.location.href = urlRetorno;
                    }
            });
        } else {
            $("#erroCPFCliente").slideDown(1000);
            $("#msgCPFCliente").html(msgErro);

            checkCpfCliente = false;

            $().ready(function () {
                setTimeout(function () {
                    //  $('#erroCPF').hide(); 
                    $('#erroCPFCliente').slideUp(1000);
                    $("#msgCPFCliente").val("");
                }, 3000); // O valor é representado em milisegundos.
            });
        }

    })

})





function carregarBeneficiarios(_id) {


    $.ajax({
        url: '/Cliente/ListaBeneficiarios', // to get the right path to controller from TableRoutes of Asp.Net MVC
        dataType: "json", //to work with json format
        type: "POST", //to do a post request
        contentType: 'application/json; charset=utf-8', //define a contentType of your request
        cache: false, //avoid caching results
        data: "{\"id\" : " + _id + "}", // here you can pass arguments to your request if you need
        success: function (data) {
            // trazer a lista
            var result = data;
            //$("#grid_Beneficiarios td").remove();

            for (var i = 0; i < result.length; i++) {

                var id = result[i].ID;

                $("#grid_Beneficiarios").append(
                    "<tr class = 'itensBeneficiario'>" +
                    "    <td id='id" + id + "' class= 'invisivel idbeneficiario'>" + id + "</td>" +
                    "    <td id='CPF" + id + "' class = 'cpfBeneficiario'>" + result[i].CPF + "</td>" +
                    "    <td id='NOME" + id + "' class = 'nomeBeneficiario'>" + result[i].Nome + "</td>" +
                    "    <td id='acaoItem" + id + "' class = 'invisivel acaoDoItem'>" + "S" + "</td>" +
                    "    <td>" +
                    " <a class='btn btn-primary btn-sm btn_alterarLinhaBeneficiario' id=" + id + " role='button'><i class='far fa-edit'></i> Alterar</a>" +
                    " <a class='btn btn-primary btn-sm btn_excluirLinhaBeneficiario' id=" + id + " role='button'><i class='far fa-trash-alt'></i> Excluir</a>" +
                    "</td>" +

                    "</tr>"
                );

            }
        },
        error: function (xhr) {
            alert("Ocorreu um erro ao carregar os Beneficiarios, tente novamente!");

        }
    });

}




function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
