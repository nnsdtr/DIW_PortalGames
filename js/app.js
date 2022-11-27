const API_KEY = '1aa3bb39c3334036a3e8b13aefa463d3';

// Exibe jogos - Abordagem FETCH

let xhr = new XMLHttpRequest()
xhr.onload = function (event) {
    let data = JSON.parse (event.target.response)
    console.log (data.results)

    let str = ''
    for(let i = 0; i < data.results.length; i++) {
        let jogo = data.results[i]
        str += `<div class="card col-md-5" style="width: 30rem;">
            <img src="${jogo.background_image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title"><b>${jogo.name}</b></h5>
                <p class="card-text">Lançamento: ${jogo.released}</p>
                <p class="card-text">Avaliação: ${jogo.rating}</p>
                <a href="https://rawg.io/games/${jogo.id}" target="_blank" class="btn btn-dark">Mais detalhes</a>
            </div>
        </div>`
    }

    document.getElementById('tela').innerHTML = str
}


xhr.open ('GET', 'https://api.rawg.io/api/games?key=1aa3bb39c3334036a3e8b13aefa463d3')
xhr.send()

