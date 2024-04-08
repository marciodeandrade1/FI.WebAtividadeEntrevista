$(document).ready(function ($) {
    $('.date').mask('00/00/0000');
    $('.time').mask('00:00:00');
    $('.time1').mask('00:00');
    $('.date_time').mask('00/00/0000 00:00:00');
    $('.mask_cep').mask('00000-000');
    $('.placa').mask('AAA-0000'); // coloquei este
    $('.placaNova').mask('AAA0A00'); // coloquei este
    $('.phone').mask('0000-0000');
    $('.phone_with_ddd').mask('(00) 0000-0000');
    $('.phone_us').mask('(000) 000-0000');    
    $('.mask_phone_br').focusout(function () {
        var phone, element;
        element = $(this);
        element.unmask();
        phone = element.val().replace(/\D/g, '');
        if (phone.length > 10) {
            element.mask("(99) 99999-9999");
        } else {
            element.mask("(99) 9999-99999");
        }
        }).trigger('focusout');
    $('.mixed').mask('AAA 000-S0S');
    $('.mask_cpf').mask('000.000.000-00', { reverse: true });
    $('.cnpj').mask('00.000.000/0000-00', { reverse: true });
    $('.money').mask('000.000.000.000.000,00', { reverse: true });
    $('.prev').mask("#######0,00", { reverse: true });
    $('.money2').mask("#.##0,00", { reverse: true });
    $('.money3').mask("#.##0,000", { reverse: true }); // com 3 casas decimais
    $('.money4').mask("#.##0,0000"); // com 4 casas decimais
    $('.moeda').mask('000000,00', { reverse: true });
    $('.moeda4').mask('000000,0000');
    $('.inteiro').mask("###00", { reverse: true }); // coloquei este
    $('.integer').mask("#.##0", { reverse: true });
    $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
        translation: {
            'Z': {
                pattern: /[0-9]/, optional: true
            }
        }
    });

    //$('.cnpjCpf').focusout(function () {
    //    var cnpj, element;
    //    element = $(this);
    //    element.unmask();
    //    cnpj = element.val().replace(/\D/g, '');
    //    if (cnpj.length > 12) {
    //        element.mask("00.000.000/0000-00");//, { reverse: true });
    //      } 
    //    else if (cnpj.length == 0) {
    //        element.mask();//, { reverse: true });
    //    }
    //    else {
    //        element.mask("000.000.000-00");
    //    }
    //    }).trigger('focusout');



    $('.cnpjCpf').mask('000.000.000-00', {
  onKeyPress : function(cpfcnpj, e, field, options) {
    const masks = ['000.000.000-000', '00.000.000/0000-00'];
    const mask = (cpfcnpj.length > 14) ? masks[1] : masks[0];
            $('.cnpjCpf').mask(mask, options);
  }
});
    $('.ip_address').mask('099.099.099.099');
    $('.percent').mask('##0,00%', { reverse: true });
    $('.clear-if-not-match').mask("00/00/0000", { clearIfNotMatch: true });
    $('.placeholder').mask("00/00/0000", { placeholder: "__/__/____" });
    $('.fallback').mask("00r00r0000", {
        translation: {
            'r': {
                pattern: /[\/]/,
                fallback: '/'
            },
            placeholder: "__/__/____"
        }
    });
    $('.selectonfocus').mask("00/00/0000", { selectOnFocus: true });



});