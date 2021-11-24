const search_btn = document.getElementById("search--btn");
search_btn.addEventListener("click", getData);

function getData() {
  let searchInput = document.querySelector("input").value;
  console.log(searchInput);
  const moviesWrapper = document.querySelector(".movies");
  let html = "";
  fetch(`http://www.omdbapi.com/?apikey=6a434c95&s='${searchInput}'`)
    .then((response) => response.json())
    .then((data) => {
      data.Search.forEach((movie) => {
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
