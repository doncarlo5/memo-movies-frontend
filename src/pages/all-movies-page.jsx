import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/movie-card";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../components/button";
import Loading from "../components/loading";

function AllMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setSearchParams] = useSearchParams();
  const sortBy = params.get("sortBy");
  function handleNextPage() {
    scrollTo(0, 0, { behavior: "smooth" });
    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1);
    }, 100);
  }

  function handlePreviousPage() {
    scrollTo(0, 0, { behavior: "smooth" });
    setTimeout(() => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }, 100);
  }

  async function fetchAllMovies() {
    const API_URL = import.meta.env.VITE_ALLMOVIES_API_URL;
    const API_KEY = import.meta.env.VITE_KEY_API_URL;
    let URL_PARAMS = `&page=${currentPage}`;
    if (sortBy) {
      URL_PARAMS += `&sort_by=${sortBy}`;
    }
    console.log(URL_PARAMS);
    const headers = {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    };

    try {
      const response = await axios.get(`${API_URL}${URL_PARAMS}`, {
        headers,
      });
      setMovies(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAllMovies(currentPage);
  }, [currentPage, sortBy]);

  return (
    <div>
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {isLoading ? (
          <Loading />
        ) : (
          movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
        )}
      </div>
      <div className="flex justify-center mt-2">
        {currentPage > 1 && (
          <Button
            onClick={handlePreviousPage}
            className="flex justify-center mr-6 font-extrabold"
          >
            {"<"}
          </Button>
        )}
        <Button
          onClick={handleNextPage}
          className="flex justify-center font-extrabold"
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}

export default AllMoviesPage;
