//nicknames
let nick1;
let nick2;

//posições jogadores
let posicaoPlay1 = '1';
let posicaoPlay2 = '2';
let casaPlay1 = 0;
let casaPlay2 = 0;

//casa que foi curado
let casaCurada1;
let casaCurada2;

//antídotos
let antidotoPlay1 = 3;
let antidotoPlay2 = 3;

//dados
let dado1;
let dado2;
let somaDados;

//construção do tabuleiro
let tabuleiro = [];
let armadilha;
let id = 1;
let rodadas = 1;

//jogar o jogo
function jogar() {
    //coletando os nicknames dos jogadores
    nick1 = document.getElementById("nick1").value;
    nick2 = document.getElementById("nick2").value;

    //altera o que aparece na página
    document.getElementById("nicknames").style.display = "none";

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

        //verifica se a armadilha sorteada já é uma armadilha
        while (tabuleiro[armadilha] == -1) {
            armadilha = Math.floor(Math.random() * 30);
        }

        tabuleiro[armadilha] = -1;
    }

    //preenchendo as casas restantes do tabuleiro
    for (let i = 0; i < 30; i++) {
        if (tabuleiro[i] != -1) {
            tabuleiro[i] = 0;
        }
        document.getElementById("linha").innerHTML += `<td rowspan="2" id="${id}">${tabuleiro[i]}</td>`;
        id++;
    }

    document.getElementById("linha").innerHTML += `<td rowspan="2" id="chegada">ARRIVAL</td>`;
    document.getElementById("jogo").style.display = "flex";
    document.getElementById("player").innerText = `${nick1}, make your choice`;
    document.getElementById("extra1").innerText = `${nick1}`;
    document.getElementById("extra2").innerText = `${nick2}`;
}

//rolar dados
function rolarDados() {
    //verifica quem está jogando
    if (rodadas % 2 != 0) {
        if (tabuleiro[casaPlay1 - 1] == -1) {
            curarVeneno();

        } else {
            avancarCasas();

            //recoloca o -1 no elemento do vetor original
            tabuleiro[casaCurada1 - 1] = -1;

            //recoloca a armadilha na tela
            document.getElementById(casaCurada1).innerHTML = tabuleiro[casaCurada1 - 1];
        }
    } else {
        if (tabuleiro[casaPlay2 - 1] == -1) {
            curarVeneno();

        } else {
            avancarCasas();

            //recoloca o -1 no elemento do vetor original
            tabuleiro[casaCurada2 - 1] = -1;

            //recoloca a armadilha na tela
            document.getElementById(casaCurada2).innerHTML = tabuleiro[casaCurada2 - 1];
        }
    }
}

//rolar dados p/ andar
function avancarCasas() {
    //sorteio de dados
    dado1 = Math.floor(Math.random() * 6 + 1);
    dado2 = Math.floor(Math.random() * 6 + 1);
    somaDados = dado1 + dado2;

    //cada rodada
    if (rodadas % 2 != 0) {
        document.getElementById("player").innerText = `${nick2}, make your choice`;

        //atualiza os status do jogo
        document.getElementById("status").innerHTML =
            `Dice 1 = ${dado1} <br> Dice 2 = ${dado2}
        <br><br> ${nick1} will walk ${somaDados} houses`;

        //retornar a casa antiga para o valor do início
        if (rodadas != 1) {
            document.getElementById(casaPlay1).innerText = tabuleiro[casaPlay1 - 1];
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
            document.getElementById('casa1').innerHTML = `is in the arrival house`;
            document.getElementById('chegada').innerHTML = `${nick1} WON`;
            document.getElementById('chegada').style.backgroundColor = 'rgb(116, 163, 116)';
            document.getElementById('status').innerHTML = `${nick1} won`;
            document.getElementById("player").innerText = `FINISHED`;
            document.getElementById("botRolar").disabled = true;
            document.getElementById("botRolar").style.cursor = 'default';
            document.getElementById("botTomar").disabled = true;
            document.getElementById("botTomar").style.cursor = 'default';
            document.getElementById("botDesistir").disabled = true;
            document.getElementById("botDesistir").style.cursor = 'default';
        }

        //atualiza a posição do jog na tela com sua cor
        document.getElementById(casaPlay1).innerText = posicaoPlay1;
        document.getElementById(casaPlay1).style.backgroundColor = 'rgb(116, 163, 116)';
        document.getElementById('casa1').innerHTML = `Is in the house ${casaPlay1}`;
        document.getElementById("inicio1").innerHTML = `BEGIN`;
        document.getElementById("inicio1").style.backgroundColor = 'white';

        //verifica se caiu na armadilha
        if (tabuleiro[casaPlay1 - 1] == -1) {
            document.getElementById('status').innerHTML += `<br> ${nick1} fell into the trap`;
        }

    } else {
        document.getElementById("player").innerText = `${nick1}, make your choice`;

        //atualiza os status do jogo
        document.getElementById("status").innerHTML =
            `Dice 1 = ${dado1} <br> Dice 2 = ${dado2}
        <br><br> ${nick2} will walk ${somaDados} houses`;

        //retornar a casa antiga para o valor do início
        if (rodadas != 2) {
            document.getElementById(casaPlay2).innerText = tabuleiro[casaPlay2 - 1];
            document.getElementById(casaPlay2).style.backgroundColor = 'white';
        }

        //casa nova
        casaPlay2 += somaDados;

        //se for igual, volta 1 casa
        if (casaPlay2 == casaPlay1) {
            casaPlay2 = casaPlay2 - 1;
        } else {
            casaPlay2 = casaPlay2;
        }

        //verifica se alguém chegou ao fim do jogo
        if (casaPlay2 > 30) {
            document.getElementById('casa2').innerHTML = `is in the arrival house`;
            document.getElementById('chegada').innerHTML = `${nick2} WON`;
            document.getElementById('chegada').style.backgroundColor = 'rgb(122, 64, 122)';
            document.getElementById('status').innerHTML = `${nick2} won`;
            document.getElementById("player").innerText = `FINISHED`;
            document.getElementById("botRolar").disabled = true;
            document.getElementById("botRolar").style.cursor = 'default';
            document.getElementById("botTomar").disabled = true;
            document.getElementById("botTomar").style.cursor = 'default';
            document.getElementById("botDesistir").disabled = true;
            document.getElementById("botDesistir").style.cursor = 'default';
        }

        //atualiza a posição do jog na tela com sua cor
        document.getElementById(casaPlay2).innerText = posicaoPlay2;
        document.getElementById(casaPlay2).style.backgroundColor = 'rgb(122, 64, 122)';
        document.getElementById('casa2').innerHTML = `Is in the house ${casaPlay2}`;
        document.getElementById("inicio2").innerHTML = `NING`;
        document.getElementById("inicio2").style.backgroundColor = 'white';

        //verifica se caiu na armadilha
        if (tabuleiro[casaPlay2 - 1] == -1) {
            document.getElementById('status').innerHTML += `<br> ${nick2} fell into the trap`;
        }
    }
    //atualiza a rodada
    rodadas++;
}

//rolar dados envenenado
function curarVeneno() {
    //sorteia os dados
    dado1 = Math.floor(Math.random() * 6 + 1);
    dado2 = Math.floor(Math.random() * 6 + 1);
    document.getElementById("status").innerHTML =
        `Dice 1 = ${dado1} <br> Dice 2 = ${dado2}
        <br>`;

    if (rodadas % 2 != 0) {
        //verifica se são iguais
        if (dado1 == dado2) {
            document.getElementById('status').innerHTML += `<br> The dices are the same! 
            <br> ${nick1} is cured of the poison!`;

            //pega a casa que foi curada
            casaCurada1 = casaPlay1;

            //muda o valor do elemento do vetor tabuleiro p/ jog andar na próx rodada
            tabuleiro[casaPlay1 - 1] = 0;
        } else {
            //muda a casa antiga pra branco
            document.getElementById(casaPlay1).innerText = String(tabuleiro[casaPlay1 - 1]);
            document.getElementById(casaPlay1).style.backgroundColor = 'white';

            //atualiza a casa nova
            casaPlay1 = casaPlay1 - 2

            //se cair na mesma casa que o outro player, volta mais 3 casas
            if (casaPlay1 == casaPlay2) {
                document.getElementById('status').innerHTML += `<br> ${nick1} will have to go back 5 houses`;
                casaPlay1 = casaPlay1 - 3
                document.getElementById(casaPlay1).innerText = posicaoPlay1;
                document.getElementById(casaPlay1).style.backgroundColor = 'rgb(116, 163, 116)';
                document.getElementById('casa1').innerHTML = `Is in the house ${casaPlay1}`;

            } else {
                document.getElementById('status').innerHTML += `<br> ${nick1} will have to go back 2 houses`;
                document.getElementById(casaPlay1).innerText = posicaoPlay1;
                document.getElementById(casaPlay1).style.backgroundColor = 'rgb(116, 163, 116)';
                document.getElementById('casa1').innerHTML = `Is in the house ${casaPlay1}`;

            }

            //vê se caiu novamente em uma armadilha
            if (tabuleiro[casaPlay1 - 1] == -1) {
                document.getElementById('status').innerHTML += `<br> ${nick1} fell into the trap`;
            }
        }
        document.getElementById("player").innerText = `${nick2}, make your choice`;
        rodadas++;

    } else {
        //verifica se são iguais
        if (dado1 == dado2) {
            document.getElementById('status').innerHTML += `<br> The dices are the same! 
            <br> ${nick2} is cured of the poison`;

            //pega a casa que foi curada
            casaCurada2 = casaPlay2;

            //muda o valor do elemento do vetor tabuleiro p/ jog andar na próx rodada
            tabuleiro[casaPlay2 - 1] = 0;
        } else {
            //muda a casa antiga pra branco
            document.getElementById(casaPlay2).innerText = String(tabuleiro[casaPlay2 - 1]);
            document.getElementById(casaPlay2).style.backgroundColor = 'white';

            //atualiza a casa nova
            casaPlay2 = casaPlay2 - 2

            //se cair na mesma casa que o outro player, volta mais 3 casas
            if (casaPlay2 == casaPlay1) {
                document.getElementById('status').innerHTML += `<br> ${nick2} will have to go back 5 houses`;
                casaPlay2 = casaPlay1 - 3
                document.getElementById(casaPlay2).innerText = posicaoPlay2;
                document.getElementById(casaPlay2).style.backgroundColor = 'rgb(122, 64, 122)';
                document.getElementById('casa2').innerHTML = `Is in the house ${casaPlay2}`;

            } else {
                document.getElementById('status').innerHTML += `<br> ${nick2} will have to go back 2 houses`;
                document.getElementById(casaPlay2).innerText = posicaoPlay2;
                document.getElementById(casaPlay2).style.backgroundColor = 'rgb(122, 64, 122)';
                document.getElementById('casa2').innerHTML = `Is in the house ${casaPlay2}`;
            }

            //vê se caiu novamente em uma armadilha
            if (tabuleiro[casaPlay2 - 1] == -1) {
                document.getElementById('status').innerHTML += `<br> ${nick2} fell into the trap`;
            }
        }
        document.getElementById("player").innerText = `${nick1}, make your choice`;
        rodadas++;
    }

}

//tomar antídoto
function tomarAntidoto() {
    if (rodadas % 2 != 0) {
        if (antidotoPlay1 == 0) {
            document.getElementById('status').innerHTML = `${nick1} has no more antidotes`;
        } else {
            antidotoPlay1--;
            document.getElementById('status').innerHTML = `${nick1} took an antidote and <br> is cured of the poison`;
            document.getElementById('estoque1').innerHTML = `Antidotes: ${antidotoPlay1}`;

            //pega a casa que foi tomado o antídoto
            casaCurada1 = casaPlay1;

            //muda o valor do elemento do vetor tabuleiro p/ jog andar na próx rodada
            tabuleiro[casaPlay1 - 1] = 0;
        }
    } else {
        if (antidotoPlay2 == 0) {
            document.getElementById('status').innerHTML = `${nick2} has no more antidotes`;
        } else {
            antidotoPlay2--;
            document.getElementById('status').innerHTML = `${nick2} took an antidote and <br> is cured of the poison`;
            document.getElementById('estoque2').innerHTML = `Antidotes: ${antidotoPlay2}`;

            //pega a casa que foi tomado o antídoto
            casaCurada2 = casaPlay2;

            //muda o valor do elemento do vetor tabuleiro p/ jog andar na próx rodada
            tabuleiro[casaPlay2 - 1] = 0;
        }
    }
    rodadas++;
}

//desistir
function desistir() {
    if (rodadas % 2 != 0) {
        document.getElementById('status').innerHTML = `${nick1} gave up`;
        document.getElementById('casa1').innerHTML = `Quit the game`;
        document.getElementById('status').innerHTML += `<br><br>${nick2} won`;
    } else {
        document.getElementById('status').innerHTML = `${nick2} gave up`;
        document.getElementById('casa2').innerHTML = `Quit the game`;
        document.getElementById('status').innerHTML += `<br><br>${nick1} won`;
    }

    document.getElementById("player").innerText = `FINISHED`;
    document.getElementById("botRolar").disabled = true;
    document.getElementById("botRolar").style.cursor = 'default';
    document.getElementById("botTomar").disabled = true;
    document.getElementById("botTomar").style.cursor = 'default';
    document.getElementById("botDesistir").disabled = true;
    document.getElementById("botDesistir").style.cursor = 'default';
}