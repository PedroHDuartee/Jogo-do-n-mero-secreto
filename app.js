/* let titulo = document.querySelector('h1');
titulo.innerHTML = "Jogo do número secreto"; */
/* let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número de 1 a 10'; */
/*Ex1
function exibirOla() {
  console.log("Olá, mundo!");
}

exibirOla();

//Ex2
function exibirNome(nome){
    console.log(`Olá, ${nome}!`);

};
exibirNome("Pedro");

//ex3
function calcularDobro(numero){
    return numero * 2
}
let resultadoDobro = calcularDobro(15);
console.log(resultadoDobro);

//ex4
function calcularMedia(a, b, c){
     return (a + b + c) / 3;
}
let media = calcularMedia(6 ,9 , 8);
console.log(media);

//ex5
function encontrarMaior(a, b ){
    return a > b ? a : b;
}
let maiorNumero = encontrarMaior( 17, 5);
console.log(maiorNumero);

//Ex6
function quadrado(numero){
    return numero * numero;
}
let resultado = quadrado(7);
console.log(resultado); */

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
}
exibirMensagemInicial();

function verificarChute(tag) {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O numero secreto é menor');
        }else{
            exibirTextoNaTela('p', 'O numero secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1 );
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = []
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}