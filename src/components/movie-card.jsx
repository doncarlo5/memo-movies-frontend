import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { languageCountryMap } from "../constants/langue-code";
import { genres } from "../constants/genres";
import Pill from "./pill";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

function getFlagUrl(lang) {
  return `http://purecatamphetamine.github.io/country-flag-icons/3x2/${languageCountryMap[lang]}.svg`;
}

function getGenreById(id) {
  for (const genre of genres) {
    if (genre.id === id) {
      const string = genre.name;

      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
  return null;
}

function MovieCard({ movie }) {
  return (
    <div className="border-2 border-dark-grey p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFFFFF] bg-white-grey transition-shadow ">
      <div>
        <Link to={`/movie/${movie.id}`}>
          <div>
            <div className=" relative">
              <div className=" bg-cover rounded-md overflow-hidden">
                <img
                  style={{ borderImage: "fill 0" }}
                  className=" hover:scale-105 transition-transform"
                  src={`${imageBaseUrl}${movie.poster_path}`}
                  alt={"poster of" + movie.title}
                />
              </div>
              <div className="bottom-1 right-1 absolute px-1.5 py-1 rounded-sm">
                <img
                  className="w-5 rounded-sm"
                  src={getFlagUrl(movie.original_language)}
                  alt={movie.original_language}
                />
              </div>
            </div>
            <h5 className=" text-lg font-semibold mt-2 mb-1">{movie.title}</h5>
            <p></p>
          </div>{" "}
        </Link>
        <div className=" text-sm flex flex-wrap gap-2">
          {movie.genre_ids.map((genreId) => (
            <Pill key={genreId} id={genreId}>
              {getGenreById(genreId)}
            </Pill>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;