//iniciar jogo
let nick1;
let nick2;

//posições jogadores
let posicaoPlay1 = '1';
let posicaoPlay2 = '2';

//antídotos
let antidotoPlay1 = 3;
let antidotoPlay2 = 3;

//construção do tabuleiro
let tabuleiro = [];
let armadilha;
let casasIguais = [];
let id = 1;
let rodadas = 1;

//jogar o jogo
function jogar() {
    //coletando os nicknames dos jogadores
    nick1 = document.getElementById("nick1").value;
    nick2 = document.getElementById("nick2").value;

    document.getElementById("nicknames").style.display = "none";
    document.getElementById("jogar").style.display = "none";
    

    //inserindo o tabuleiro
    document.getElementById("tabela").innerHTML =
        `<tr id='linha'>
            <td style="background: rgb(116, 163, 116)" id="inicio1">1</td>
        </tr>
        <tr>
            <td style="background: rgb(122, 64, 122)" id="inicio2">2</td>
        </tr>`;


    //sorteando as casas da armadilha
    for (i = 0; i < 10; i++) {
        armadilha = Math.floor(Math.random() * 30);
        casasIguais.push(armadilha)
        tabuleiro[armadilha] = -1;
    }
    console.log(casasIguais)
    console.log(casasIguais.length)

    //preenchendo as casas restantes do tabuleiro
    for (let i = 0; i < 30; i++) {
        if (tabuleiro[i] != -1) {
            tabuleiro[i] = 0;
        }
        document.getElementById("linha").innerHTML += `<td rowspan="2" id="${id}">${tabuleiro[i]}</td>`;
        id++;
    }
    document.getElementById("linha").innerHTML += `<td rowspan="2" id="chegada">CHEGADA</td>`;
    document.getElementById("jogo").style.display = "flex";  
    document.getElementById("player").innerText = `${nick1}, faça a sua escolha`;  
    document.getElementById("extra1").innerText = `${nick1}`;  
    document.getElementById("extra2").innerText = `${nick2}`;  
}

//dados
let dado1;
let dado2;
let somaDados;

//posicao jogadores
let casaPlay1 = 0;
let casaPlay2 = 0;

//rolar dados
function rolarDados() {
    //sorteio de dados
    dado1 = Math.floor(Math.random() * 6 + 1);
    dado2 = Math.floor(Math.random() * 6 + 1);
    somaDados = dado1 + dado2;

    //cada rodada
    if (rodadas % 2 != 0) {
        document.getElementById("player").innerText = `${nick2}, faça a sua escolha`;

        //atualiza os status do jogo
        document.getElementById("status").innerHTML =
            `Dado 1 = ${dado1} <br> Dado 2 = ${dado2}
        <br> ${nick1} andará ${somaDados} casas`;

        //retornar a casa antiga para o valor do início
        if (rodadas != 1) {
            document.getElementById(casaPlay1).innerText = String(tabuleiro[casaPlay1 - 1]);
            document.getElementById(casaPlay1).style.backgroundColor = 'white';
        }

        //casa nova
        casaPlay1 += somaDados;

        //se for igual, volta 1 casa
        if (casaPlay1 == casaPlay2) {
            casaPlay1 = casaPlay1 - 1;
        } else {
            casaPlay1 = casaPlay1;
        }

        //verifica se alguém chegou ao fim do jogo
        if (casaPlay1 > 30) {
            document.getElementById('chegada').innerHTML = `${nick1} VENCEU`;
            document.getElementById('status').innerHTML = `${nick1} venceu`;
        }


        //atualiza a posição do jog na tela com sua cor
        document.getElementById(casaPlay1).innerText = posicaoPlay1;
        document.getElementById(casaPlay1).style.backgroundColor = 'rgb(116, 163, 116)';
        document.getElementById('casa1').innerHTML = `Está na casa ${casaPlay1}`;
        document.getElementById("inicio1").innerHTML = `INI`;
        document.getElementById("inicio1").style.backgroundColor = 'white';

        if (tabuleiro[casaPlay1 - 1] == -1) {
            document.getElementById('status').innerHTML = `${nick1} caiu na armadilha`;
        } 

    } else {
        document.getElementById("player").innerText = `${nick1}, faça a sua escolha`;

        document.getElementById("status").innerHTML =
            `Dado 1 = ${dado1} <br> Dado 2 = ${dado2}
        <br> ${nick2} andará ${somaDados} casas`;

        if (rodadas != 2) {
            document.getElementById(casaPlay2).innerText = String(tabuleiro[casaPlay2 - 1]);
            document.getElementById(casaPlay2).style.backgroundColor = 'white';
        }

        casaPlay2 += somaDados;

        if (casaPlay2 == casaPlay1) {
            casaPlay2 = casaPlay2 - 1;
        } else {
            casaPlay2 = casaPlay2;
        }

        if (casaPlay2 > 30) {
            document.getElementById('chegada').innerHTML = `${nick2} VENCEU`;
        }

        document.getElementById(casaPlay2).innerText = posicaoPlay2;
        document.getElementById(casaPlay2).style.backgroundColor = 'rgb(122, 64, 122)';
        document.getElementById('casa2').innerHTML = `Está na casa ${casaPlay2}`;
        document.getElementById("inicio2").innerHTML = `CIO`;
        document.getElementById("inicio2").style.backgroundColor = 'white';

        if (tabuleiro[casaPlay2 - 1] == -1) {
            document.getElementById('status').innerHTML = `${nick2} caiu na armadilha`;
        } 
    }

    console.log(`rodada ${rodadas}`);
    rodadas++;
    console.log("Casa Play 1: " + casaPlay1);
    console.log("Casa Play 2: " + casaPlay2);
}


function curarVeneno() {
    dado1 = Math.floor(Math.random() * 6 + 1);
    dado2 = Math.floor(Math.random() * 6 + 1);
    document.getElementById("status").innerHTML =
            `Dado 1 = ${dado1} <br> Dado 2 = ${dado2}
        <br>`;

    if (rodadas%2 != 0) {
        if (dado1 == dado2) {
            document.getElementById('status').innerHTML += `<br> ${nick1} está curado do veneno`;
        } else {
            document.getElementById(casaPlay1).innerText = String(tabuleiro[casaPlay1 - 1]);
            document.getElementById(casaPlay1).style.backgroundColor = 'white';
            casaPlay1 = casaPlay1 - 2

            if (casaPlay1 == casaPlay2) {
                document.getElementById('status').innerHTML += `<br> ${nick1} terá que voltar 5 casas`;
                casaPlay1 = casaPlay1 - 3
                document.getElementById(casaPlay1).innerText = posicaoPlay1;
                document.getElementById(casaPlay1).style.backgroundColor = 'rgb(116, 163, 116)';
                document.getElementById('casa1').innerHTML = `Está na casa ${casaPlay1}`;

            } else {
                document.getElementById('status').innerHTML += `<br> ${nick1} terá que voltar 2 casas`;
                document.getElementById(casaPlay1).innerText = posicaoPlay1;
                document.getElementById(casaPlay1).style.backgroundColor = 'rgb(116, 163, 116)';
                document.getElementById('casa1').innerHTML = `Está na casa ${casaPlay1}`;
            }  
        }
        document.getElementById("player").innerText = `${nick2}, faça a sua escolha`;
        rodadas++;

    } else {
        if (dado1 == dado2) {
            document.getElementById('status').innerHTML += `<br> ${nick2} está curado do veneno`;
        } else {
            document.getElementById(casaPlay2).innerText = String(tabuleiro[casaPlay2 - 1]);
            document.getElementById(casaPlay2).style.backgroundColor = 'white';
            casaPlay2 = casaPlay2 - 2

            if (casaPlay2 == casaPlay1) {
                document.getElementById('status').innerHTML += `<br> ${nick2} terá que voltar 5 casas`;
                casaPlay2 = casaPlay1 - 3
                document.getElementById(casaPlay2).innerText = posicaoPlay2;
                document.getElementById(casaPlay2).style.backgroundColor = 'rgb(122, 64, 122)';
                document.getElementById('casa2').innerHTML = `Está na casa ${casaPlay2}`;

            } else {
                document.getElementById('status').innerHTML += `<br> ${nick2} terá que voltar 2 casas`;
                document.getElementById(casaPlay2).innerText = posicaoPlay2;
                document.getElementById(casaPlay2).style.backgroundColor = 'rgb(122, 64, 122)';
                document.getElementById('casa2').innerHTML = `Está na casa ${casaPlay2}`;
            }  
        }
        document.getElementById("player").innerText = `${nick1}, faça a sua escolha`;
        rodadas++;
    }

}

//tomar antídoto
function tomarAntidoto() {
    if (rodadas % 2 != 0) {
        antidotoPlay1--;
        document.getElementById('status').innerHTML = `${nick1} tomou um antídoto e <br> está curado do veneno`;
        document.getElementById('estoque1').innerHTML = `Antídotos: ${antidotoPlay1}`;
    } else {
        antidotoPlay2--;
        document.getElementById('status').innerHTML = `${nick2} tomou um antídoto e <br> está curado do veneno`;
        document.getElementById('estoque2').innerHTML = `Antídotos: ${antidotoPlay2}`;
    }

    rodadas++;
}


//desistir
function desistir() {
    if (rodadas % 2 != 0) {
        document.getElementById('status').innerHTML = `${nick2} venceu`;
    } else {
        document.getElementById('status').innerHTML = `${nick1} venceu`;
    }
}