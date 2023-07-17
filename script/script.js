const apiKey = "b8ace792";
let moviesList;
let searchArray = [];
let searchTitle;
let movieTitle;
let movieDetails;

let fetchSearchAPI = async () => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTitle}`
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
      `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
  }
};

const getMoviesList = async () => {
  moviesList = await fetchSearchAPI();
  searchArray = moviesList.Search;
  return searchArray;
};

const getMovieDetails = async () => {
  movieDetails = await fetchDetailsAPI();
  return movieDetails;
};

const generateSearchList = (event) => {
  event.preventDefault();
  searchTitle = searchInput.value;
  getMoviesList();
  let listElement = document.querySelector(".search-list-popup");
  if (searchTitle.length >= 3) {
    setTimeout(() => {
      listElement.style.display = "block";
      let popupList = `<ul class="popup-list">`;
      searchArray.map((item) => {
        popupList =
          popupList +
          `<li class="list-item">
              <img src="${
                item.Poster != "N/A" ? item.Poster : "./../images/no-image.png"
              }" alt="poster" class="list-item-poster">
              <div class="list-item-title">${item.Title}</div>
              <div class="list-item-year">${item.Year}</div>
            </li>`;
      });
      popupList = popupList + `</ul>`;
      listElement.innerHTML = popupList;
    }, 2000);
  } else if (searchTitle.length < 3) {
    listElement.style.display = "none";
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  movieTitle = searchInput.value;
  getMovieDetails();
  document.querySelector(".search-list-popup").style.display = "none";
  setTimeout(() => {
    let movieDetailsElement = document.querySelector(".movie-details-part");
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
