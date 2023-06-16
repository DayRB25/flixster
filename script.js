var form = document.getElementById("form");
var searchBtn = document.getElementById("searchBtn");
var searchField = document.getElementById("searchField");
var movieContainer = document.getElementById("moviecontainer");
var loadBtn = document.getElementById("loadBtn");

const apiKey = "0d02fe98abd1fa29b643a231a9ac3b49";

// array for movie data fetched from API
let results;

// index of current movie to be displayed in results array
let currMovieIdx;

///////////////
// Provided a film's data, create the appropriate HTML structure with classnames (see comment in index.HTML for structure), and fill with
// required data
///////////////
const addMovieElement = (movie) => {
  const movieItemContainer = document.createElement("div");
  movieItemContainer.className = "moviecontainer--movie";

  const moviePoster = document.createElement("img");
  moviePoster.className = "moviecontainer--movie_img";
  moviePoster.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

  const movieInfoContainer = document.createElement("div");
  movieInfoContainer.className = "moviecontainer--movie_info";

  const movieRatingContainer = document.createElement("div");
  movieRatingContainer.className = "moviecontainer--movie_info-rating";

  const starImg = document.createElement("img");
  starImg.className = "moviecontainer--movie_info-rating_star";
  starImg.src = "25533-transformed.png";

  const movieRatingValue = document.createElement("p");
  movieRatingValue.innerText = `${movie.vote_average}`;

  movieRatingContainer.appendChild(starImg);
  movieRatingContainer.appendChild(movieRatingValue);

  const movieTitle = document.createElement("p");
  movieTitle.innerText = `${movie.title}`;

  movieInfoContainer.appendChild(movieRatingContainer);
  movieInfoContainer.appendChild(movieTitle);

  movieItemContainer.appendChild(moviePoster);
  movieItemContainer.appendChild(movieInfoContainer);

  movieContainer.appendChild(movieItemContainer);
};

const validateSearchInput = (searchTerm) => {
  let termLength = searchTerm.length;
  let valid = false;
  for (let i = 0; i < termLength; i++) {
    if (searchTerm.charCodeAt(i) != 10 && searchTerm.charCodeAt(i) != 32) {
      valid = true;
    }
  }

  return false;
};

const insertClearButton = () => {
  const clearButton = document.createElement("button");
  clearButton.innerText = "Clear";
  clearButton.addEventListener("click", async (event) => {
    event.preventDefault();
    searchField.value = "";

    // reload original data
    movieContainer.innerHTML = "";
    clearButton.remove();
    try {
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      results = data.results;

      // POPULATING LANDING SCREEN WITH 6 FILMS
      for (currMovieIdx = 0; currMovieIdx < 6; currMovieIdx++) {
        let movie = results[currMovieIdx];
        addMovieElement(movie);
      }
    } catch (error) {
      console.log(error);
    }
  });
  form.appendChild(clearButton);
};

document.addEventListener("DOMContentLoaded", async (event) => {
  event.preventDefault();

  try {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    results = data.results;

    // POPULATING LANDING SCREEN WITH 6 FILMS
    for (currMovieIdx = 0; currMovieIdx < 6; currMovieIdx++) {
      let movie = results[currMovieIdx];
      addMovieElement(movie);
    }
  } catch (error) {
    console.log(error);
  }
});

///////////////
// Load new movies onto the DOM 6 at a time (if 6 or more movies left to be displayed). If less than 6 movies, add remaining and remove load button
///////////////
loadBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const numMovies = results.length;
  const startIdx = currMovieIdx;

  // add the minimum of 6 elements or how many are remaining to be displayed
  for (let i = 0; i < Math.min(6, numMovies - startIdx); i++) {
    let movie = results[currMovieIdx++];
    addMovieElement(movie);
  }

  // current idx out of bounds of results array
  if (currMovieIdx >= numMovies) {
    loadBtn.remove();
  }
});

///////////////
// Clears original landing screen movies and replaces them with movies matching search term
///////////////
searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const searchMovie = searchField.value;
  insertClearButton();
  movieContainer.innerHTML = "";
  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      searchMovie
    )}`;

    const response = await fetch(url);
    const data = await response.json();

    results = data.results;

    // POPULATING SCREEN WITH 6 FILMS
    for (currMovieIdx = 0; currMovieIdx < 6; currMovieIdx++) {
      let movie = results[currMovieIdx];
      addMovieElement(movie);
    }
  } catch (error) {
    console.log(error);
  }
});
