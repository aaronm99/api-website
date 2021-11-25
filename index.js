const search_btn = document.getElementById("search--btn");
search_btn.addEventListener("click", getData);

function getData() {
  let searchInput = document.querySelector("input").value;
  let results = document.querySelector(".result__txt");
  results.innerHTML = `Results for "${searchInput}"`;

  const moviesWrapper = document.querySelector(".movies");
  let html = "";

  fetch(`https://www.omdbapi.com/?apikey=6a434c95&s='${searchInput}'`)
    .then((response) => response.json())
    .then((data) => {
      data.Search.forEach((movie) => {
        if (movie.Poster == "N/A") {
          movie.Poster = "./assets/notavailable.png";
        }

        html += `<div class="movie">
                  <figure class="movie__img--wrapper">
                    <img
                      class="movie__img"
                      src="${movie.Poster}"
                      alt=""
                    />
                  </figure>
                  <h2 class="movie__title">${movie.Title}</h2>
                  <div class="movie__year">${movie.Year}</div>
                </div>`;
        moviesWrapper.innerHTML = html;
      });
    });
}

function searchKeyPress(e) {
  // look for window.event in case event isn't passed in
  e = e || window.event;
  if (e.keyCode == 13) {
    document.getElementById("search--btn").click();
    return false;
  }
  return true;
}
