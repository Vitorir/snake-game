// Jogo da Cobra (Snake Game)
// Autor: Jan Bodnar
// Adaptado por: Gilson Pereira
// Código fonte original: http://zetcode.com/javascript/snake/


// Declaração de variáveis e constantes

var tela;
var ctx;

var cabeca;
var maca;
var bola;
var obstaculo;

var contaMaca = 0;
var contaVida = 5; // Iniciar com 5 vidas
var tempo = 300;

var pontos;
var maca_x = [];
var maca_y = [];

var obstaculo_x = [];
var obstaculo_y = [];

var paraEsquerda = false;
var paraDireita = true;
var paraCima = false;
var paraBaixo = false;
var noJogo = true;    

const TAMANHO_PONTO = 10;
const ALEATORIO_MAXIMO = 29;
var ATRASO = 120; // transformar a constante em var pra mudar toda vez que a cobra comer maca
const C_ALTURA = 300;
const C_LARGURA = 300;    

const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_ACIMA = 38;
const TECLA_ABAIXO = 40;

var x = [];
var y = [];

onkeydown = verificarTecla; // Define função chamada ao se pressionar uma tecla

iniciar(); // Chama função inicial do jogo


// Definição das funções

function iniciar() {
    tela = document.getElementById("tela");
    ctx = tela.getContext("2d");

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, C_LARGURA, C_ALTURA);

    //audio.play();
    carregarImagens();
    criarCobra();
    localizarMaca();
    localizarObstaculo(); // #4 Implementar no Iniciar
    
    setTimeout("cicloDeJogo()", ATRASO);
}    

function carregarImagens() {
    cabeca = new Image();
    cabeca.src = "cabeca.png";    
    
    bola = new Image();
    bola.src = "ponto.png";
    
    maca = new Image();
    maca.src = "maca.png";

    obstaculo = new Image() // desenha obstaculo
    obstaculo.src = "b02b88d8461a4fb2.png"
}


function play() {
    var audio = new Audio ("MusicaDeFundo.ogg");
    audio.play();
    audio.loop = true;
    audio.pause;
}


function criarCobra() {
    pontos = 3;
	
    for (var z = 0; z < pontos; z++) {
        x[z] = 50 - z * TAMANHO_PONTO;
        y[z] = 50;
    }
}

function localizarObstaculo () { // #2 fazer localizarObstaculo igual localizarMaca
     for (var i = 0; i < 10; i++) {
         var t = Math.floor(Math.random() * ALEATORIO_MAXIMO)
         obstaculo_x[i] = t * TAMANHO_PONTO
         obstaculo_y[i] = t * TAMANHO_PONTO
     }
}

function localizarMaca() {
    for (var i = 0; i < 15; i++) { // loop para gerar 15 coord. x e y para 15 macas
        var r = Math.floor(Math.random() * ALEATORIO_MAXIMO);
        maca_x[i] = r * TAMANHO_PONTO;
    
        r = Math.floor(Math.random() * ALEATORIO_MAXIMO);
        maca_y[i] = r * TAMANHO_PONTO;
    }
}    

function cicloDeJogo() {
    if (noJogo) {
        verificarMaca();
        verificarObstaculo(); // #5 implementar no ciclodeJogo
        verificarColisao();
        mover();
        fazerDesenho();
        tempo -= 1;
        if (tempo == 0) {
            noJogo = false;
        }
        setTimeout("cicloDeJogo()", ATRASO);
    }
}

function verificarObstaculo() { // #3 fazer funcao igual verificarMaca
    for (var i = 0; i < 10; i++) {
        if ((x[0] == obstaculo_x[i]) && y[0] == obstaculo_y[i]) {
            contaVida -= 1;
            ATRASO -= 5;
            obstaculo_x[i] = 400;
            obstaculo_y[i] = 400;
        }
    }
}

function verificarMaca() {
    for (var i = 0; i < 15; i++) { // loop para verificar as 15 macas
        if ((x[0] == maca_x[i]) && (y[0] == maca_y[i])) {
            pontos++;
            contaMaca++;
            ATRASO -= 5;
            if (contaMaca == 3) {
                contaVida++;
                contaMaca = 0;
            }
            maca_x[i] = 400 // numero fora da area
            maca_y[i] = 400 // mesma logica para os obstaculos
            //localizarMaca();
        }
        if (contaVida == 0) { // dar fim de jogo se contador de vida dar igual a 0
            noJogo = false;
        }
        if (pontos == 18) { // quando comer 15 maças, vc ganha o jogo
            noJogo = false;
        }
    }
}

function verificarColisao() {
    for (var z = pontos; z > 0; z--) {
        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            noJogo = false;
        }
    }

    if (y[0] >= C_ALTURA) {
        noJogo = false;
    }

    if (y[0] < 0) {
       noJogo = false;
    }

    if (x[0] >= C_LARGURA) {
      noJogo = false;
    }

    if (x[0] < 0) {
      noJogo = false;
    }
}

function mover() {
    for (var z = pontos; z > 0; z--) {
        x[z] = x[z-1];
        y[z] = y[z-1];
    }

    if (paraEsquerda) {
        x[0] -= TAMANHO_PONTO;
    }

    if (paraDireita) {
        x[0] += TAMANHO_PONTO;
    }

    if (paraCima) {
        y[0] -= TAMANHO_PONTO;
    }

    if (paraBaixo) {
        y[0] += TAMANHO_PONTO;
    }
}    

function fazerDesenho() {
    ctx.clearRect(0, 0, C_LARGURA, C_ALTURA);
	ctx.fillRect(0, 0, C_LARGURA, C_ALTURA);
	
    if (noJogo) {
        for (var i = 0; i < 15; i++) { // loop pra desenhar 15 macas
            ctx.drawImage(maca, maca_x[i], maca_y[i]);
        }

        for (var i = 0; i < 10; i++) { // #1 desenhar obstaculo
            ctx.drawImage(obstaculo, obstaculo_x[i], obstaculo_y[i])
        }
		
        for (var z = 0; z < pontos; z++) {
            if (z == 0) {
                ctx.drawImage(cabeca, x[z], y[z]); // desenha cabeca
            } else {
                ctx.drawImage(bola, x[z], y[z]); // desenha corpo da cobra
            }
        }    
    } else {
        fimDeJogo();
    }        
}

function fimDeJogo() {
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle"; 
    ctx.textAlign = "center"; 
    ctx.font = "normal bold 18px serif";
    ctx.fillText("Fim de Jogo", C_LARGURA/2, C_ALTURA/2);
}

function verificarTecla(e) {
    var tecla = e.keyCode;

    if ((tecla == TECLA_ESQUERDA) && (!paraDireita)) {
        paraEsquerda = true;
        paraCima = false;
        paraBaixo = false;
    }

    if ((tecla == TECLA_DIREITA) && (!paraEsquerda)) {
        paraDireita = true;
        paraCima = false;
        paraBaixo = false;
    }

    if ((tecla == TECLA_ACIMA) && (!paraBaixo)) {
        paraCima = true;
        paraDireita = false;
        paraEsquerda = false;
    }

    if ((tecla == TECLA_ABAIXO) && (!paraCima)) {
        paraBaixo = true;
        paraDireita = false;
        paraEsquerda = false;
    }        
}