const movieNameRef = document.getElementById("movie-name");
const movieYearRef = document.getElementById("movie-year");
const searchBtn = document.getElementById("search-button");
const result = document.getElementById("result");

// Helper function to validate year
const checkYear = (year) => {
  const today = new Date();
  if (year > 1874 && year <= today.getFullYear()) {
    return true;
  } else {
    return false;
  }
};

// funtion to fetch data from api
const getMovieData = () => {
  const movieName = movieNameRef.value;
  const movieYear = Number(movieYearRef.value);
  console.log(checkYear(movieYear));
  const url = checkYear(movieYear)
    ? `${apiKey}${movieName}&y=${movieYear}`
    : `${apiKey}${movieName}`;

  // Check if input is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="message">Please enter a movie name</h3>`;
  } else {
    // use fetch to get the movie name
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Check if the movei was found
        if (data.Response === "True") {
          result.innerHTML = `<div class="info">
          <img class="poster" src="${data.Poster}" alt="${data.Title} Poster" />
          <div class="info-text">
            <h2>${data.Title}</h2>
            <div class="rating">
              <img src="./assets/star-icon.svg" alt="star" />
              <h4>${data.imdbRating}</h4>
            </div>
            <div class="details">
              <span>${data.Rated}</span>
              <span>${data.Year}</span>
              <span>${data.Runtime}</span>
            </div>
            <div class="genre">
              <div>${data.Genre.split(",").join("</div><div>")}</div>
            </div>
              <h3>Plot</h3>
              <p>${data.Plot}</p>
              <h3>Cast</h3>
              <p>${data.Actors}</p>
          </div>
        </div>
          `;
        } else {
          result.innerHTML = `<h3 class="message">${data.Error}</h3>`;
        }
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML = `<h3 class="message">Error Occured</h3>`;
      });
  }
};

searchBtn.onclick = () => getMovieData();
window.onload = () => getMovieData();
