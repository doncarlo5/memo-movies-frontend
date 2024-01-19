import React, { useState, useEffect } from "react";
import "./AllMoviesPages.css";
import axios from "axios";
import { Link } from "react-router-dom";

function AllMoviesPages() {
  const [movies, setMovies] = useState(null);

  async function fetchAllMovies() {
    const API_URL = import.meta.env.VITE_ALLMOVIES_API_URL;
    const API_KEY = import.meta.env.VITE_KEY_API_URL;

    const headers = {
      Authorization: `Bearer ${API_KEY}`,
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
