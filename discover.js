function filterType(event) {
  if (event.target.value == "MOVIES") {
    getMovies();
  } else if (event.target.value == "SHOWS") {
    getShows();
  }
}

function getMovies() {
  let moviesWrapper = document.getElementById("movies");
  let html = "";

  // fetch(`https://imdb-api.com/en/API/Top250Movies/k_dgbq6ez1`).then(res => res.json).then(data => {

  // })
  fetch(`https://imdb-api.com/en/API/Top250Movies/k_dgbq6ez1`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 100; i++) {
        // console.log(data.items[i].title);
        html += `<div class="movie">
                        <h2 class="movie__rank">${data.items[i].rank}.</h2>
                        <figure class="top--movie__img--wrapper">
                            <img
                                class="top--movie__img"
                                src="${data.items[i].image}"
                                alt=""
                            />
                        </figure>
                        <h2 class="movie__title">${data.items[i].title}</h2>
                        <div class="movie__year">${data.items[i].imDbRating}/10</div>
                </div>`;
      }
      moviesWrapper.innerHTML = html;
    });
}

function getShows() {
  let showsWrapper = document.getElementById("movies");
  let html = "";

  fetch(`https://imdb-api.com/en/API/Top250TVs/k_dgbq6ez1`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 100; i++) {
        // console.log(data.items[i].title);
        html += `<div class="movie">
                        <h2 class="movie__rank">${data.items[i].rank}.</h2>
                        <figure class="top--movie__img--wrapper">
                            <img
                                class="top--movie__img"
                                src="${data.items[i].image}"
                                alt=""
                            />
                        </figure>
                        <h2 class="movie__title">${data.items[i].title}</h2>
                        <div class="movie__year">${data.items[i].imDbRating}/10</div>
                </div>`;
      }
      showsWrapper.innerHTML = html;
    });
}
