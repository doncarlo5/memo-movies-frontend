import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/button/button";

function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);

  const { movieId } = useParams();

  const navigate = useNavigate();

  async function fetchOneMovie() {
    const ONEMOVIE_API_URL = "https://api.themoviedb.org/3/movie/";

    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmIxOGJlOGU1NmZmNzY4ODhmMmYxYTQzZmQzNTMzZSIsInN1YiI6IjY1YTkwMDJiOGVkYTg3MDEzNzg1Y2VlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LFpOMKieR0fTsF6nPZ-5VN5udaD8uEsxl49RPbYcH4o",
      accept: "application/json",
    };

    try {
      const response = await axios.get(ONEMOVIE_API_URL + movieId, { headers });
      setMovie(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchOneMovie();
  }, []);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      {movie && (
        <>
          <img src={`${imageBaseUrl}${movie.poster_path}`} alt={movie.title} />
          <h3>{movie.title}</h3>
          <p>{movie.tagline}</p>
          <p>Date: {movie.release_date}</p>
          <p>Description: {movie.overwiew}</p>
          <p>
            <div className=" flex flex-wrap gap-2">
              Genre :{" "}
              {movie.genres.map((genre) => (
                <span className=" rounded-full bg-[#CCCCCC]" key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>
          </p>

          <Button
            className=" ml-5"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </>
      )}
    </div>
  );
}

export default MovieDetailsPage;
