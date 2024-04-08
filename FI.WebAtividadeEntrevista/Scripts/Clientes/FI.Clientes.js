
var IdCliente = null;
var checkCpfCliente = false;
var checkCpf = false;
var msgErro = "";
var cpfAlteracao = "";
var ehAlteracao = false;


$(document).ready(function () {

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        if (checkCpfCliente) {
            var ListaBeneficiarios = new Array();

            $('#grid_Beneficiarios tr').not(":first").each(function () {

                ListaBeneficiarios.push({

                    ID: $(this).find('.idbeneficiario').text(),
                    CPF: $(this).find('.cpfBeneficiario').text(),
                    Nome: $(this).find('.nomeBeneficiario').text(),

                });

                return ListaBeneficiarios;
            });
            $.ajax({
                url: urlPost,
                method: "POST",
                data: {
                    "NOME": $(this).find("#Nome").val(),
                    "CPF": $(this).find("#CPF").val(),
                    "CEP": $(this).find("#CEP").val(),
                    "Email": $(this).find("#Email").val(),
                    "Sobrenome": $(this).find("#Sobrenome").val(),
                    "Nacionalidade": $(this).find("#Nacionalidade").val(),
                    "Estado": $(this).find("#Estado").val(),
                    "Cidade": $(this).find("#Cidade").val(),
                    "Logradouro": $(this).find("#Logradouro").val(),
                    "Telefone": $(this).find("#Telefone").val(),
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