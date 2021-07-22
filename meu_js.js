function getRequest(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function criaSelect(estado) {
    opcao = document.createElement("option");
    opcao.value = estado.id
    opcao.text = estado.nome
    return opcao;
}

function getCEP(){
    var cep = document.getElementById("cep").value;
    let datacep = getRequest("https://viacep.com.br/ws/" + cep + "/json/");
    datacep = JSON.parse(datacep)
    var campo = $("#logradouro")[0];
    campo.value = datacep.logradouro;
    console.log(campo)
}

$('.target').on('change', function () {
    $("#cidade>option").remove();
    var selectedestado = $(this).find('option:selected').val();
    let data2 = getRequest("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + selectedestado + "/municipios");
    let municipios = JSON.parse(data2);
    var dropwdown2 = document.getElementById("cidade");
    municipios.forEach(element => {
        let linha = criaSelect(element);
        dropwdown2.add(linha, dropwdown2.options[0]);
    });
});



function main() {
    let data = getRequest("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    let estados = JSON.parse(data);
    var dropwdown = document.getElementById("estado");
    estados.forEach(element => {
        let linha = criaSelect(element);
        dropwdown.add(linha, dropwdown.options[0]);
    });
}

function maior(valor){
    if (valor > 8){
        alert("O tempo de descanso não pode ser maior que 8 horas")
    }
}

$('.habilitacao').on('change', function (){
    if($('.habilitacao')[0].checked){
        $("#categoria").prop('disabled', false);
    }else {
        $("#categoria").prop('disabled', true);
        $('#categoria')[0].value = ""
    }
});

$('.test').on('change', function () {
     //Segunda
     let carga_semanal = 0
     let contador = 0 
     let array_dias = ['seg', 'ter', 'qua', 'qui', 'sex']
     array_dias.forEach((v) => {
        let inicioseg = $('#inicio_'+ v)[0].value
        inicioseg = inicioseg.split(":")
        inicioseg = parseFloat (inicioseg[0]) + parseFloat((inicioseg[1]/60))
        let fimseg = $('#fim_' + v)[0].value
        fimseg = fimseg.split(":")
        fimseg = parseFloat (fimseg[0]) + parseFloat((fimseg[1]/60))
        let descansoseg = parseInt($('#descanso_' + v)[0].value)
   
   
        if(inicioseg && fimseg && descansoseg){
            let cargahs = fimseg - inicioseg - descansoseg 
            carga_semanal += cargahs
            contador++
            if(cargahs > 10){
                alert("Carga Horaria maxima excedida")
            }
            
            if(contador > 4 ){
                if(carga_semanal < 20){
                    alert("Carga semanal inferior ao permitido")
                }
                if(carga_semanal > 40){
                    alert("Carga semanal superior ao permitido")
                }
            }

            $('#carga_' + v)[0].value = cargahs
            $('#carga_semanal')[0].value = carga_semanal

        }
   
        console.log(inicioseg, fimseg, descansoseg)
     })
     

});

function MascaraInteiro(num) {
    var er = /[^0-9]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {///verifica se é string, caso seja então apaga
        var texto = $(campo).val();
        $(campo).val(texto.substring(0, texto.length - 1));
        return false;
    } else {
        return true;
    }
}
function MascaraFloat(num) {
    var er = /[^0-9.,]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {///verifica se é string, caso seja então apaga
        var texto = $(campo).val();
        $(campo).val(texto.substring(0, texto.length - 1));
        return false;
    } else {
        return true;
    }
}
 //formata de forma generica os campos
function formataCampo(campo, Mascara) {
    var er = /[^0-9/ (),.-]/;
    er.lastIndex = 0;

    if (er.test(campo.value)) {///verifica se é string, caso seja então apaga
        var texto = $(campo).val();
        $(campo).val(texto.substring(0, texto.length - 1));
    }
    var boleanoMascara;
    var exp = /\-|\.|\/|\(|\)| /g
    var campoSoNumeros = campo.value.toString().replace(exp, "");
    var posicaoCampo = 0;
    var NovoValorCampo = "";
    var TamanhoMascara = campoSoNumeros.length;
    for (var i = 0; i <= TamanhoMascara; i++) {
        boleanoMascara = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                || (Mascara.charAt(i) == "/"))
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) == "(")
                || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "))
        if (boleanoMascara) {
            NovoValorCampo += Mascara.charAt(i);
            TamanhoMascara++;
        } else {
            NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
            posicaoCampo++;
        }
    }
    campo.value = NovoValorCampo;
    ////LIMITAR TAMANHO DE CARACTERES NO CAMPO DE ACORDO COM A MASCARA//
    if (campo.value.length > Mascara.length) {
        var texto = $(campo).val();
        $(campo).val(texto.substring(0, texto.length - 1));
    }
    //////////////
    return true;
}

function MascaraMoeda(i) {
    var v = i.value.replace(/\D/g, '');
    v = (v / 100).toFixed(2) + '';
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    i.value = v;
}

function MascaraGenerica(seletor, tipoMascara) {
    setTimeout(function () {
        if (tipoMascara == 'CPFCNPJ') {
            if (seletor.value.length <= 14) { //cpf
                formataCampo(seletor, '000.000.000-00');
            } else { //cnpj
                formataCampo(seletor, '00.000.000/0000-00');
            }
        } else if (tipoMascara == 'DATA') {
            formataCampo(seletor, '00/00/0000');
        } else if (tipoMascara == 'CEP') {
            formataCampo(seletor, '00000-000');
        } else if (tipoMascara == 'TELEFONE') {
            formataCampo(seletor, '(00) 000000000');
        } else if (tipoMascara == 'INTEIRO') {
            MascaraInteiro(seletor);
        } else if (tipoMascara == 'FLOAT') {
            MascaraFloat(seletor);
        } else if (tipoMascara == 'CPF') {
            formataCampo(seletor, '000.000.000-00');
        } else if (tipoMascara == 'CNPJ') {
            formataCampo(seletor, '00.000.000/0000-00');
        } else if (tipoMascara == 'MOEDA') {
            MascaraMoeda(seletor);
        }
    }, 200);
}

function emailMask(email) {
	var maskedEmail = email.replace(/([^@\.])/g, "*").split('');
	var previous	= "";
	for(i=0;i<maskedEmail.length;i++){
		if (i<=1 || previous == "." || previous == "@"){
			maskedEmail[i] = email[i];
		}
		previous = email[i];
	}
	return maskedEmail.join('');
}

function ValidarCPF(Objcpf){
    var cpf = Objcpf.value;
    exp = /\.|\-/g
    cpf = cpf.toString().replace( exp, "" ); 
    var digitoDigitado = eval(cpf.charAt(9)+cpf.charAt(10));
    var soma1=0, soma2=0;
    var vlr =11;

    for(i=0;i<9;i++){
            soma1+=eval(cpf.charAt(i)*(vlr-1));
            soma2+=eval(cpf.charAt(i)*vlr);
            vlr--;
    }       
    soma1 = (((soma1*10)%11)==10 ? 0:((soma1*10)%11));
    soma2=(((soma2+(2*soma1))*10)%11);

    var digitoGerado=(soma1*10)+soma2;
    if(digitoGerado!=digitoDigitado)        
            alert('CPF Invalido!');         
}

function checarEmail(){
    if( document.forms[0].email.value=="" 
       || document.forms[0].email.value.indexOf('@')==-1 
         || document.forms[0].email.value.indexOf('.')==-1 )
        {
          alert( "Por favor, informe um E-MAIL válido!" );
          return false;
        }
    }


    function Mascara_Hora(input){ 
        var hora01 = ''; 
        Hora = input.value
        console.log("Teste")
        hora01 = hora01 + Hora; 
        if (hora01.length == 2){ 
        hora01 = hora01 + ':'; 
        input.value = hora01; 
        } 
        if (hora01.length == 5){ 
        Verifica_Hora(Hora); 
        } 
        } 
                   
        function Verifica_Hora(Hora){ 
        hrs = (Hora.substring(0,2)); 
        min = (Hora.substring(3,5)); 
                       
        estado = ""; 
        if ((hrs < 00 ) || (hrs > 23) || ( min < 00) ||( min > 59)){ 
        estado = "errada"; 
        } 
                       
        if (Hora == "") { 
        estado = "errada"; 
        } 
         
        if (estado == "errada") { 
        alert("Hora inválida!"); 
        //Hora.focus(); 
        } 
        } 

main()
