const apiKey = "b8ace792";
let moviesList;
let searchArray = [];
let searchTitle;
let movieTitle;
let movieDetails;
let listElement = document.querySelector(".search-list-popup");
let movieDetailsElement = document.querySelector(".movie-details-part");

let fetchSearchAPI = async () => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTitle}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
  }
};

let fetchDetailsAPI = async () => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
  }
};

const generateSearchList = async (event) => {
  event.preventDefault();
  searchTitle = event.target.value;

  if (searchTitle.length >= 3) {
    try {
      moviesList = await fetchSearchAPI();
      if (moviesList.Response === "True") {
        searchArray = moviesList.Search;
        listElement.style.display = "block";
        let popupList = `<ul class="popup-list">`;
        searchArray.map((item, index) => {
          popupList =
            popupList +
            `<li class="list-item" onclick="handleCardClick(event , ${index})">
              <img src="${
                item.Poster != "N/A" ? item.Poster : "./../images/no-image.png"
              }" alt="poster" class="list-item-poster">
              <div class="list-item-title">${item.Title}</div>
              <div class="list-item-year">${item.Year}</div>
            </li>`;
        });
        popupList = popupList + `</ul>`;
        listElement.innerHTML = popupList;
      } else {
        listElement.innerHTML = `<div class="search-error">
(⊙_◎)
        <br />
        couldn't find anything yet! <br/>
 Check for typo in your search or type more character to complete</div>`;
      }
    } catch (error) {
      console.log("error", error);
    }
  } else if (searchTitle.length < 3) {
    listElement.style.display = "none";
  }
};

const handleCardClick = async (event, index) => {
  event.preventDefault();
  movieTitle = searchArray[index].Title;
  document.querySelector(".search-list-popup").style.display = "none";

  movieDetailsElement.innerHTML = `<div class="loading">Loading...Please wait</div>`;
  movieDetails = await fetchDetailsAPI();
  movieDetailsElement.innerHTML = `<div class="movie-details">
            <img src="${
              movieDetails.Poster != "N/A"
                ? movieDetails.Poster
                : "./images//no-image.png"
            }" alt="movie image" class="movie-poster">
            <div class="movie-details-content">
              <h2 class="movie-title">${movieDetails.Title}</h2>
              <div class="genre-year">
                <div class="genre">${movieDetails.Genre}</div>
                <div class="year">${movieDetails.Year}</div>
              </div>
              <div class="director"><strong>Director</strong>: ${
                movieDetails.Director
              }</div>
              <div class="actors"><strong>Actors</strong>: ${
                movieDetails.Actors
              }</div>
              <div class="plot">
                <strong>Plot</strong>: ${movieDetails.Plot}
              </div>
            </div>
          </div>`;
  searchInput.value = "";
};

const handleSubmit = async (event) => {
  event.preventDefault();
  movieTitle = searchInput.value;
  movieDetails = await fetchDetailsAPI();
  document.querySelector(".search-list-popup").style.display = "none";
  movieDetailsElement.innerHTML = `<div class="loading">Loading...Please wait</div>`;
  setTimeout(() => {
    movieDetailsElement.innerHTML = `<div class="movie-details">
          <img src="${
            movieDetails.Poster != "N/A"
              ? movieDetails.Poster
              : "./images//no-image.png"
          }" alt="movie image" class="movie-poster">
          <div class="movie-details-content">
            <h2 class="movie-title">${movieDetails.Title}</h2>
            <div class="genre-year">
              <div class="genre">${movieDetails.Genre}</div>
              <div class="year">${movieDetails.Year}</div>
            </div>
            <div class="director"><strong>Director</strong>: ${
              movieDetails.Director
            }</div>
            <div class="actors"><strong>Actors</strong>: ${
              movieDetails.Actors
            }</div>
            <div class="plot">
              <strong>Plot</strong>: ${movieDetails.Plot}
            </div>
          </div>
        </div>`;
  }, 1000);
  searchInput.value = "";
};
let searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", handleSubmit);
let searchInput = document.getElementById("movie-title-input");
searchInput.addEventListener("keyup", generateSearchList);
