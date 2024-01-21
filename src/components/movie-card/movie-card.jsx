import React from "react";
import { Link } from "react-router-dom";
import { languageCountryMap } from "../../constants/langue-code";
import { genres } from "../../constants/genres";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

function getFlagUrl(lang) {
  return `http://purecatamphetamine.github.io/country-flag-icons/3x2/${languageCountryMap[lang]}.svg`;
}

function getGenreById(id) {
  for (const genre of genres) {
    if (genre.id === id) {
      return genre.name;
    }
  }
  return null;
}

function MovieCard({ movie }) {
  return (
    <div className=" p-2 bg-parchment rounded-md hover:shadow-md transition-shadow">
      <Link to={`/movie/${movie.id}`}>
        <div>
          <div className=" relative">
            <img
              style={{ borderImage: "fill 0 linear-gradient(#0003,#000);" }}
              className=""
              src={`${imageBaseUrl}${movie.poster_path}`}
              alt={"poster of" + movie.title}
            />
            <div className="bottom-4 right-4 absolute px-1.5 py-1 rounded-sm backdrop-blur-md bg-[#000000]/50">
              <img
                className="w-5 rounded-sm"
                src={getFlagUrl(movie.original_language)}
                alt={movie.original_language}
              />
            </div>
          </div>
          <h5>{movie.title}</h5>
          <h6>
            Langue :<em></em>
          </h6>
          <p>
            {movie.genre_ids.map((genreId) => getGenreById(genreId)).join(", ")}
          </p>
          <p>Description: {movie.overview}</p>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
