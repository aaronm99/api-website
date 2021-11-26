const search_btn = document.getElementById("search--btn");
const moviesWrapper = document.querySelector(".movies");
let empty = document.querySelector(".empty__container");
search_btn.addEventListener("click", getData);

function getData() {
  let searchInput = document.querySelector("input").value;
  let results = document.querySelector(".result__txt");

  let movies = document.querySelector(".movies");
  let loading = document.querySelector(".loading__container");

  results.innerHTML = `Results for "${searchInput}"`;

  let html = "";
  loading.style.display = "flex";
  skeleton();

  fetch(`https://www.omdbapi.com/?apikey=6a434c95&s='${searchInput}'`)
    .then((response) => response.json())
    .then((data) => {
      try {
        data.Search.forEach((movie) => {
          if (movie) {
            loading.style.display = "none";
            movies.style.display = "flex";
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

function skeleton() {
  skeletonhtml = `<div class="movie">
                    <div class="skeleton-poster skeleton"></div>
                    <div class="skeleton-title skeleton"></div>
                    <div class="skeleton-year skeleton"></div>
                  </div>`;
  moviesWrapper.innerHTML = skeletonhtml.repeat(10);
  empty.style.display = "none";
}
