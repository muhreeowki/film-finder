import { useState } from "react";
import "./App.css";
import apiKey from "./constants/key";
import star from './assets/star-icon.svg'

const App = () => {
  // Initialize afew states
  const [result, setResult] = useState(false);
  const [searchValues, setSearchValues] = useState({
    movieNameRef: "",
    movieYearRef: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [movie, setMovie] = useState({
    Title: "",
    Poster: "",
    imdbRating: "",
    Rated: "",
    Year: "",
    Runtime: "",
    Plot: "",
    Actors: "",
    Genre: [],
  });

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
    const movieName = searchValues.movieNameRef;
    const movieYear = Number(searchValues.movieYearRef);
    console.log(checkYear(movieYear));
    const url = checkYear(movieYear)
      ? `${apiKey}${movieName}&y=${movieYear}`
      : `${apiKey}${movieName}`;

    // Check if input is empty
    if (movieName.length <= 0) {
      setResult(false)
      setErrorMessage("Please enter a movie name");
    } else {
      // use fetch to get the movie name
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Check if the movei was found
          if (data.Response === "True") {
            setMovie(data);
            setResult(true)
          } else {
            setResult(false)
            setErrorMessage(data.Error);
          }
        })
        .catch((error) => {
          console.log(error);
          setResult(false)
          setErrorMessage("An Error Occured");
        });
    }
  };

  window.onkeydown = (e) => {
    if (e.key == "Enter" && searchValues.movieNameRef !== "") {
      getMovieData();
    }
  };

  return (
    <div className="container">
      {/* Search bar */}
      <div id="search-container">
        <input
          id="movie-name"
          type="text"
          name="movieNameRef"
          placeholder="Movie Title..."
          value={searchValues.movieNameRef}
          onChange={(e) =>
            setSearchValues({
              ...searchValues,
              [e.target.name]: e.target.value,
            })
          }
        />
        <input
          id="movie-year"
          type="text"
          name="movieYearRef"
          placeholder="Year (Optional)"
          value={searchValues.movieYearRef}
          onChange={(e) =>
            setSearchValues({
              ...searchValues,
              [e.target.name]: e.target.value,
            })
          }
        />
        <button id="search-button" onClick={getMovieData}>
          Search
        </button>
      </div>
      {/* Movie results */}
      <div id="result">
        {/* Display error message if there is an error message */}
        {errorMessage !== "" && !result ? (
          <h3 className="message">{errorMessage}</h3>
        ) : '' }
        {result ? (
          <div className="info">
            <img className="poster" src={movie.Poster} alt={movie.Title} />
            <div className="info-text">
              <h2>{movie.Title}</h2>
              <div className="rating">
                <img src={star} alt="star" />
                <h4>{movie.imdbRating}</h4>
              </div>
              <div className="details">
                <span>{movie.Rated}</span>
                <span>{movie.Year}</span>
                <span>{movie.Runtime}</span>
              </div>
              <div className="genre">
                <div>{movie.Genre}</div>
              </div>
              <h3>Plot</h3>
              <p>{movie.Plot}</p>
              <h3>Cast</h3>
              <p>{movie.Actors}</p>
            </div>
          </div>
        ) : ''}
      </div>
    </div>
  );
};

export default App;
