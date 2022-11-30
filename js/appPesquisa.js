const API_KEY = "1aa3bb39c3334036a3e8b13aefa463d3";

let searchConfig = {
  numberOfElements: 10,
  currentPage: null,
  nextPage: null,
};

function renderGameList(games) {
  let str = '';

  for (let i = 0; i < games.length; i++) {
    let jogo = games[i];
    str = str +
      `<div class="card col-md-5" style="width: 30rem;">
        <img src="${jogo.background_image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><b>${jogo.name}</b></h5>
          <p class="card-text">Lançamento: ${jogo.released}</p>
          <p class="card-text">Avaliação: ${jogo.rating}</p>
          <a href="https://rawg.io/games/${jogo.id}" target="_blank" class="btn btn-dark">Mais detalhes</a>
        </div>
      </div>`;
  }

  return str;
}


function searchBtnRequest(query) {
  let url = new URL("https://api.rawg.io/api/games");

  url.searchParams.set('search', query);
  url.searchParams.set('page_size', searchConfig.numberOfElements);
  url.searchParams.set('key', API_KEY);

  searchConfig.currentPage = url;
  return true;
}

function moreGamesBtnRequest(query) {
  if (searchConfig.nextPage != null) {
    searchConfig.currentPage = searchConfig.nextPage;
    return true;
  }
  return false;
}

function loadGames(games) {
  document.getElementById("conteudoJogos").innerHTML = renderGameList(games);
}

function loadMoreGames(games) {
  document.getElementById("conteudoJogos").innerHTML += renderGameList(games);
}

function search(requester, loader) {
  let query = document.getElementById("textoFiltro").value.toLowerCase();

  if (query == '') {
    alert(`Digite um termo para busca!`)
    return;
  };

  if ( requester(query) ) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.onload = (event) => {
      if (xhr.status == 200) {
        loader(event.target.response['results']);
        searchConfig.nextPage = event.target.response['next'];
      }
      else
        alert(`Erro ${xhr.status}: ${xhr.statusText}`);
    };

    xhr.open("GET", searchConfig.currentPage);
    xhr.send();
  }
}


document
  .getElementById("btnPesquisa")
  .addEventListener("click", () => { search(searchBtnRequest, loadGames) });

document
  .getElementById("btnMaisJogos")
  .addEventListener("click", () => { search(moreGamesBtnRequest, loadMoreGames) });
