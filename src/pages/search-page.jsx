import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/loading";
import MovieCard from "../components/movie-card";
import Button from "../components/button";

function SearchPage() {
  const [moviesSearch, setMoviesSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchSearchMovies(query) {
    const SEARCHMOVIE_API_URL =
      "https://api.themoviedb.org/3/search/movie?query=";

    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmIxOGJlOGU1NmZmNzY4ODhmMmYxYTQzZmQzNTMzZSIsInN1YiI6IjY1YTkwMDJiOGVkYTg3MDEzNzg1Y2VlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LFpOMKieR0fTsF6nPZ-5VN5udaD8uEsxl49RPbYcH4o",
      accept: "application/json",
    };

    try {
      const response = await axios.get(SEARCHMOVIE_API_URL + query, {
        headers,
      });
      setMoviesSearch(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchSearchMovies();
  }, [query]);

  return (
    <div>
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {isLoading ? (
          <Loading />
        ) : (
          moviesSearch.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))
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

export default SearchPage;
