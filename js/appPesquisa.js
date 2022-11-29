const API_KEY = '1aa3bb39c3334036a3e8b13aefa463d3';

let inicio = 0;
let fim = 6;
let pagina = 1;

function filtro(){
    var filtro = document.getElementById("textoFiltro").value;
    exibeJogos(filtro.toLowerCase())
}

function exibeJogos (filtroBusca) {

    let sectionConteudoJogos = document.getElementById('conteudoJogos');
    let str = sectionConteudoJogos.innerHTML;

    // Montar texto HTML dos filmes
    let dados = JSON.parse (this.responseText);

    for (inicio; inicio < fim; inicio++) {
        let jogo = dados.results[inicio];

        if(jogo.name.toLowerCase().startsWith(filtroBusca)){

        str = str + `<div class="card col-md-5" style="width: 30rem;">
            <img src="${jogo.background_image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title"><b>${jogo.name}</b></h5>
                <p class="card-text">Lançamento: ${jogo.released}</p>
                <p class="card-text">Avaliação: ${jogo.rating}</p>
                <a href="https://rawg.io/games/${jogo.id}" target="_blank" class="btn btn-dark">Mais detalhes</a>
            </div>
        </div>`;
        }
    };

    switch (fim){
        case 18:
            fim++;
            break;
        case 19:
            fim = 6;
            inicio = 0;
            pagina++;
        default:
            fim +=6;
    }
    sectionConteudoJogos.innerHTML = str;
}

function carregarMaisJogos () {

    let xhr = new XMLHttpRequest ();
    xhr.onload = exibeJogos;
    xhr.open ('GET', `https://api.rawg.io/api/games?key=${API_KEY}&page=${pagina}`);
    xhr.send ();
}

document.getElementById ('btnMaisJogos').addEventListener ('click', carregarMaisJogos);
document.addEventListener('load' ,carregarMaisJogos());

