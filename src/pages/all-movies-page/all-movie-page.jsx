import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../../components/movie-card/movie-card";
import { Link } from "react-router-dom";

function AllMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
      console.log(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    ``;
    fetchAllMovies();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
      {isLoading
        ? "Loading..."
        : movies.map((movie, i) => <MovieCard movie={movie} key={i} />)}
    </div>
  );
}

export default AllMoviesPage;
