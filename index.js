const search_btn = document.getElementById("search--btn");
search_btn.addEventListener("click", getData);

function getData() {
  let searchInput = document.querySelector("input").value;
  let results = document.querySelector(".result__txt");
  let empty = document.querySelector(".empty__container");
  let movies = document.querySelector(".movies");
  let loading = document.querySelector(".loading__container");
  const moviesWrapper = document.querySelector(".movies");

  results.innerHTML = `Results for "${searchInput}"`;

  let html = "";
  loading.style.display = "flex";

  fetch(`https://www.omdbapi.com/?apikey=6a434c95&s='${searchInput}'`)
    .then((response) => response.json())
    .then((data) => {
      try {
        data.Search.forEach((movie) => {
          if (movie) {
            loading.style.display = "none";
            movies.style.display = "flex";
            empty.style.display = "none";
          }

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
      } catch (e) {
        empty.style.display = "flex";
        movies.style.display = "none";
        loading.style.display = "none";
      }
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
