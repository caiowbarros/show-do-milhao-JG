//Exibe as regras
function showRules() {
    var obj = document.getElementById("regras");
    if (obj.style.display === "none") {
        obj.style.display = "block";
    } else {
        obj.style.display = "none";
    }
}

//Inicia o jogo
function startGame() {
    //Verifica se os botões estão aparecendo
    var i = document.getElementById("menu");
    if (i.style.display != "none") {
        i.style.display = "none";
    }
    var j = document.getElementById("jogo");
    if (j.style.display == "none") {
        j.style.display = "block";
    }
    var k = document.getElementById("regras");
    if (k.style.display == "block") {
        k.style.display = "none";
    }

    if (count < perguntas.length) {
        document.getElementById("pergunta").innerHTML = perguntas[count];
        document.getElementById("resposta1").innerHTML = respostas[count][0];
        document.getElementById("resposta2").innerHTML = respostas[count][1];
        document.getElementById("resposta3").innerHTML = respostas[count][2];
        document.getElementById("resposta4").innerHTML = respostas[count][3];
        if (count == 0) {
            document.getElementById("errar").innerHTML = 'NADA';
            document.getElementById("parar").innerHTML = 'NADA'
            document.getElementById("acertar").innerHTML = valores[count] + ' MIL';
        } else if (count == 15) {
            document.getElementById("errar").innerHTML = 'PERDE TUDO';
            document.getElementById("parar").innerHTML = din;
            document.getElementById("acertar").innerHTML = valores[count];
        } else {
            document.getElementById("errar").innerHTML = din / 2 + ' MIL';
            document.getElementById("parar").innerHTML = din + ' MIL';
            document.getElementById("acertar").innerHTML = valores[count] + ' MIL';
        }
    } else {
        gameWon();
    }
}

//Termina o jogo
function refreshGame() {
    var i = document.getElementById("menu");
    i.style.display = "block";
    var j = document.getElementById("jogo");
    j.style.display = "none";
    var k = document.getElementById("ganhou");
    k.style.display = "none";
    var x = document.getElementById("perdeu");
    x.style.display = "none";
    count = 0;
    din = 0;
}

//arrays com perguntas e repostas
var perguntas = ['O QUE É A VIA LÁCTEA?',
                 'A ÁGUA FERVE A QUANTOS GRAUS CENTÍGRADOS?',
                 'QUEM FOI O GRANDE AMOR DE JULIETA?',
                 'QUEM FOI O CRIADOR DOS PERSONAGENS PEDRINHO, NARIZINHO E EMÍLIA?',
                 'QUEM FUNDOU A MICROSOFT?',
                 'QUE IMPERADOR PÔS FOGO EM ROMA?',
                 'EM QUAL ESTÁDIO PELÉ MARCOU SEU MILÉSIMO GOL?',
                 'QUE RIO CORTA A CIDADE DE LONDRES, NA INGLATERRA?',
                 'QUANTOS QUILATES TEM O OURO PURO?',
                 'EM QUE CIDADE ESTÁ SITUADA A FAMOSA PRAÇA VERMELHA?',
                 'EM QUAL ESPÉCIE O MACHO CHOCA OS OVOS E A FÊMEA PROCURA ALIMENTO?',
                 'ONDE NASCEU VAN GOGH, O GRANDE PINTOR IMPRESSIONISTA?',
                 'QUAL PRESIDENTE BRASILEIRO INSTITUIU O AI-5?',
                 'NA CRIAÇÃO DO ESTADO DO TOCANTINS, QUE ESTADO TEVE O TERRITÓRIO REDUZIDO?',
                 'QUAL OCEANO TEM O MAIOR VOLUME DE ÁGUA?',
                 'EM QUE DIA NASCEU E EM QUE DIA FOI REGISTRADO O PRESIDENTE LULA?'];
//['resposta1', ..., 'resposta4', alternativa correta]
var respostas = [
                ['MARCA DE LEITE', 'CIVILIZAÇÃO ANTIGA', 'CARRO', 'GALÁXIA', 4],
                ['200', '100', '170', '220', 2],
                ['ROMEU', 'ORFEU', 'HAMLET', 'IAGO', 1],
                ['MAURÍCIO DE SOUSA', 'ZIRALDO', 'MONTEIRO LOBATO', 'MACHADO DE ASSIS', 3],
                ['SULTÃO DE BRUNEI', 'AKIO MORATA', 'BILL GATES', 'PRÍNCIPE CHARLES', 3],
                ['TRAJANO', 'NERO', 'BRUTUS', 'CALÍGULA', 2],
                ['MORUMBI', 'PACAEMBU', 'MARACANÃ', 'MINEIRÃO', 3],
                ['TÂMISA', 'SENA', 'RENO', 'AUBE', 1],
                ['18', '20', '24', '30', 3],
                ['MOSCOU', 'BERLIM', 'PARIS', 'ROMA', 1],
                ['ANDORINHA', 'PATO SELVAGEM', 'PINGUIM', 'MARRECO', 3],
                ['POLÔNIA', 'FRANÇA', 'ITÁLIA', 'HOLANDA', 4],
                ['COSTA E SILVA', 'ERNESTO GEISEL', 'JOÃO FIGUEIREDO', 'ITAMAR FRANCO', 1],
                ['GOIÁS', 'MATO GROSSO', 'PARÁ', 'MARANHÃO', 1],
                ['ATLÂNTICO', 'PACÍFICO', 'ÍNDICO', 'ÁRTICO', 2],
                ['6 E 27 DE OUTUBRO', '8 E 27 DE OUTUBRO', '9 E 26 DE OUTUBRO', '7 E 23 DE OUTUBRO', 1],
                ];
//valores (pontuação)
var valores = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500, '1 MILHÃO'];
//contador das perguntas
let count = 0;
//Dinheiro ganho (pontuação)
let din = 0;
//Audio quando acerta
var audioAcertar = new Audio('./audio/certa-resposta.mp3');
//Audio quando para
var audioParar = new Audio('./audio/ok-parou.mp3');
//Audio quando erra
var audioErrar = new Audio('./audio/que-pena-errou.mp3');
//Audio quando ganha 1 milhão
var audioGanhar = new Audio('./audio/1-milhao.mp3');

//Verifica se a resposta está certa
function playGame(resposta) {
    if (resposta == respostas[count][4]) {
        if (count == 15) {
            gameWon();
        } else {
            audioAcertar.play();
            count++;
            din = valores[count - 1];
            startGame();
        }
    } else {
        gameOver();
    }
}

//Caso o usuário venca o jogo (1 milhão)
function gameWon() {
    audioGanhar.play();
    var i = document.getElementById("jogo");
    i.style.display = "none";
    var j = document.getElementById("ganhou");
    j.style.display = "block";
}

//Caso o usuário erre alguma pergunta
function gameOver() {
    audioErrar.play();
    var i = document.getElementById("jogo");
    i.style.display = "none";
    var j = document.getElementById("perdeu");
    j.style.display = "block";
    document.getElementById("pontuacao").innerHTML = 'PONTUAÇÃO: ' + din / 2 + ' MIL';
}

//Caso o usuário decida parar
function stopGame() {
    audioParar.play();
    var i = document.getElementById("jogo");
    i.style.display = "none";
    var j = document.getElementById("perdeu");
    j.style.display = "block";
    document.getElementById("pontuacao").innerHTML = 'PONTUAÇÃO: ' + din + ' MIL';
}