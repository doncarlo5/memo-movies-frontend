import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { genres } from "../constants/genres"
import { languageCountryMap } from "../constants/langue-code"
import Pill from "./pill"

const imageBaseUrl = "https://image.tmdb.org/t/p/w500"

function getFlagUrl(lang) {
  if (languageCountryMap[lang]) {
    return `http://purecatamphetamine.github.io/country-flag-icons/3x2/${languageCountryMap[lang]}.svg`
  } else {
    return
  }
}

function getGenreById(id) {
  for (const genre of genres) {
    if (genre.id === id) {
      const string = genre.name

      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
  return null
}

function coverImage(movie) {
  if (movie.poster_path) {
    return `${imageBaseUrl}${movie.poster_path}`
  }
  return "https://i.imgur.com/E5Z9K6S.png"
}

function MovieCard({ movie }) {
  return (
    <div className="group border-dark-grey bg-black  dark:border-white dark:bg-dark-color-mode dark:text-white">
      <div className="h-full transform-gpu border-2 border-dark-grey bg-white p-4 transition-transform group-hover:translate-x-[-6px] group-hover:translate-y-[-6px]">
        <Link to={`/movie/${movie.id}`}>
          <div>
            <div className=" relative">
              <div className=" overflow-hidden rounded-md bg-cover">
                <img
                  style={{ borderImage: "fill 0" }}
                  src={coverImage(movie)}
                  // src={`https://i.imgur.com/.png`}
                  // src={`${imageBaseUrl}${movie.poster_path}`}

                  alt={"poster of" + movie.title}
                />
              </div>
              <div className="absolute bottom-1 right-1 rounded-sm px-1.5 py-1">
                <img
                  className="w-5 rounded-sm"
                  src={getFlagUrl(movie.original_language)}
                  alt={movie.original_language}
                />
              </div>
            </div>
            <h5 className=" mb-1 mt-2 text-lg font-semibold">{movie.title}</h5>
            <p></p>
          </div>{" "}
        </Link>
        <div className=" flex flex-wrap gap-2 text-sm">
          {movie.genre_ids.map((genreId) => (
            <Pill key={genreId} id={genreId}>
              {getGenreById(genreId)}
            </Pill>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
