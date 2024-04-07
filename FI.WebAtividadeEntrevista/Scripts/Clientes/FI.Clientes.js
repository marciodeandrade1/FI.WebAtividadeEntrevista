
$(document).ready(function () {
    $('#formCadastro').submit(function (e) {
        e.preventDefault();
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
                "CPF": $(this).find("#CPF").val()
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
// ========================================================================
// ================       BENEFICIARIO
// ========================================================================
function ModalBeneficiario() {
    var random = Math.random().toString().replace('.', '');
    var Modal = `      

<div class="row">
    <div class="col-md-5">
        <div class="form-group">
            <label for="Nacionalidade">CPF:</label>
            <input required="required" type="text" class="form-control" id="CpfBeneficiario" name="CpfBeneficiario" placeholder="010.011.111-00" maxlength="14">
        </div>
    </div>

    <div class="col-md-5">
        <div class="form-group">
            <label for="Nome">Nome:</label>
            <input required="required" type="text" class="form-control" id="NomeBeneficiario" name="NomeBeneficiario" placeholder="Ex.: João" maxlength="50">
        </div>
    </div>
    <div class="col-md-2">
        <button type="button" class="btn btn-sm btn-success" style="margin-top: 40%;" onclick="IncluirBeneficiario('${random}')" id="BtnIncluirBeneficiario">Incluir</button>
    </div>
</div>
<div class="row">
    <div class="col-lg-12">
        <table id="GridBeneficiario${random}" class="table table-striped" style="width:100%"></table>
    </div>
</div>
<div class="row">
    <div class="col-lg-12">
        <div class="pull-right">
            <button type="button" class="btn btn-sm btn-danger" id="BtnVoltarBeneficiario" onclick="Alterar_Voltar('${random}')" style="display:none">Voltar</button>
            <button type="button" class="btn btn-sm btn-success" id="BtnSalvarBeneficiario" onclick="SalvarAlteracao('${random}')" style="display:none">Salvar</button>
        </div>
    </div>
</div>
`;
    ModalDialog("Beneficiários", Modal);

    $('#CpfBeneficiario').mask('999.999.999-99'); // Mask CPF
    LoadGridBeneficiario(random);
}
function LoadGridBeneficiario(random) {
    // Estrutura Datatable
    var columns = [
        { data: 'id', title: 'Id', visible: false },
        { data: 'tipo', title: 'tipo', visible: false },
        { data: 'cpf', title: 'Cpf' },
        { data: 'nome', title: 'Nome' },
        {
            title: 'Ações',
            width: '100px',
            render: function (data, type, row) {
                // Criar os botões de Editar e Excluir
                var editButton = `<button class="btn btn-primary btn-sm" onclick="AlterarBeneficiario('${random}', '${row.cpf}')">Alterar</button>`;
                var deleteButton = `<button class="btn btn-primary btn-sm" onclick="ExcluirBeneficiario('${random}', '${row.cpf}')">Excluir</button>`;
                return editButton + ' ' + deleteButton;
            }
        }
    ];

    // Config DataTable
    $(`#GridBeneficiario${random}`).DataTable({
        columns: columns,
        paging: false,
        searching: false,
        lengthChange: false,
        info: false
    });

    CarregaTabela(random);
}
function IncluirBeneficiario(random) {
    if (!ValidaDados()) return;

    ListaBeneficiario.push({ id: 0, tipo: 1, cpf: $("#CpfBeneficiario").val(), nome: $("#NomeBeneficiario").val() });

    LimpaBeneficiario();

    CarregaTabela(random);
}
function CarregaTabela(random) {
    $(`#GridBeneficiario${random}`).DataTable().clear().draw();
    $(`#GridBeneficiario${random}`).DataTable().rows.add(ListaBeneficiario.filter(function (item) { return item.tipo != 3; })).draw();
}
function ValidaDados() {
    var Error = "";
    var cpf = $("#CpfBeneficiario").val();
    if ($("#NomeBeneficiario").val() == "") {
        Error = "Preencha o Nome do Beneficiario.";
    } else if (cpf.length != 14) {
        Error = "Preencha completamento o CPF.";
    } else if (!validaCPF(cpf)) {
        Error = "Esse CPF não é valido!";
    } else if (ListaBeneficiario.filter(function (item) { if (item.cpf == cpf && ListaBeneficiario.indexOf(item) != IndexBeneficiario && item.tipo != 3) { return item } }).length > 0) {
        Error = "CPF já cadastrado!";
    }


    if (Error != "") {
        ModalDialog("Ocorreu um erro", Error);
        return false
    }
    return true
}
function LimpaBeneficiario() {
    $("#NomeBeneficiario").val("");
    $("#CpfBeneficiario").val("");
    IndexBeneficiario = -1;
}

function AlterarBeneficiario(random, cpf) {
    var row = ListaBeneficiario.filter(function (item) { return item.cpf == cpf; })[0];
    IndexBeneficiario = ListaBeneficiario.indexOf(row);
    $("#NomeBeneficiario").val(row.nome);
    $("#CpfBeneficiario").val(row.cpf);
    PadraoModal(random, true);
}
function Alterar_Voltar(random) {
    LimpaBeneficiario();
    PadraoModal(random, false);
}
function PadraoModal(random, alterar) {
    if (alterar) {
        $(`#GridBeneficiario${random}`).hide()
        $(`#BtnIncluirBeneficiario`).hide()
        $(`#BtnVoltarBeneficiario`).show()
        $(`#BtnSalvarBeneficiario`).show()
    } else {
        $(`#GridBeneficiario${random}`).show()
        $(`#BtnIncluirBeneficiario`).show()
        $(`#BtnVoltarBeneficiario`).hide()
        $(`#BtnSalvarBeneficiario`).hide()
    }
}
function ExcluirBeneficiario(random, cpf) {
    var row = ListaBeneficiario.filter(function (item) { return item.cpf == cpf; })[0];
    if (row.id == 0) {
        ListaBeneficiario.splice(ListaBeneficiario.indexOf(row), 1)
    } else {
        row.tipo = 3;
    }
    CarregaTabela(random);
}
function SalvarAlteracao(random) {
    if (!ValidaDados()) return;

    ListaBeneficiario[IndexBeneficiario].cpf = $("#CpfBeneficiario").val();
    ListaBeneficiario[IndexBeneficiario].nome = $("#NomeBeneficiario").val();
    if (ListaBeneficiario[IndexBeneficiario].id != 0 && ListaBeneficiario[IndexBeneficiario].tipo != 1) { ListaBeneficiario[IndexBeneficiario].tipo = 2; }

    LimpaBeneficiario();

    CarregaTabela(random);
    PadraoModal(random, false);
}
function validaCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; // CPF com todos os dígitos iguais é inválido
    }

    // Calcula o primeiro dígito verificador
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
        return false; // Primeiro dígito verificador inválido
    }

    // Calcula o segundo dígito verificador
    soma = 0;
    for (var i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10))) {
        return false; // Segundo dígito verificador inválido
    }

    return true; // CPF válido
}