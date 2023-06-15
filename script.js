var searchBtn = document.getElementById("submitbtn");
var movieContainer = document.getElementById("moviecontainer");
var loadBtn = document.getElementById("loadBtn");

document.addEventListener("DOMContentLoaded", async (event) => {
  event.preventDefault();

  try {
    const apiKey = "0d02fe98abd1fa29b643a231a9ac3b49";

    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    // POPULATING LANDING SCREEN WITH 6 FILMS
    for (let i = 0; i < 6; i++) {
      ///////////////
      // For each film, access film's info (movie), create the appropriate HTML structure with classnames (see comment in index.HTML for structure), and fill with
      // required data
      ///////////////
      const movie = results[i];

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
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
