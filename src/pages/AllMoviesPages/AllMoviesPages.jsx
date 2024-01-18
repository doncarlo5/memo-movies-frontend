import React, { useState, useEffect } from "react";
import "./AllMoviesPages.css";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieDetailsPage from "../MovieDetailsPage/MovieDetailsPage";

function AllMoviesPages() {
  const [movies, setMovies] = useState(null);

  async function fetchAllMovies() {
    const API_URL =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmIxOGJlOGU1NmZmNzY4ODhmMmYxYTQzZmQzNTMzZSIsInN1YiI6IjY1YTkwMDJiOGVkYTg3MDEzNzg1Y2VlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LFpOMKieR0fTsF6nPZ-5VN5udaD8uEsxl49RPbYcH4o",
      accept: "application/json",
    };

    try {
      const response = await axios.get(API_URL, { headers });
      setMovies(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      {movies &&
        movies.map((movie, id) => {
          return (
            <div key={id}>
              <Link to={`/movie/${movie.id}`}>
                <div className="text-parchment">
                  <img
                    src={`${imageBaseUrl}${movie.poster_path}`}
                    alt={"poster of" + movie.title}
                  />
                  <h5 className="parchment">{movie.title}</h5>
                  <h6>
                    Langue :<em>{movie.original_language}</em>
                  </h6>
                  <p>Description: {movie.overview}</p>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default AllMoviesPages;
