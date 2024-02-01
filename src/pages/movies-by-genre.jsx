import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

import Button from "../components/button"
import Loading from "../components/loading"
import MovieCard from "../components/movie-card"
import { genres as genreList } from "../constants/genres"
import { discoveryApi, searchApi } from "./../api/apiHandler"

function moviesByGenre() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const navigate = useNavigate()

  const { genre } = useParams()
  const selectedGenre = genreList.find((el) => el.name === genre)

  function handleNextPage() {
    scrollTo(0, 0, { behavior: "smooth" })
    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1)
    }, 100)
  }

  function handlePreviousPage() {
    scrollTo(0, 0, { behavior: "smooth" })
    setTimeout(() => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    }, 100)
  }

  async function fetchMoviesByGenre() {
    try {
      const response = await discoveryApi.api.get(`&page=${currentPage}&with_genres=${selectedGenre.id}`)
      setMovies(response.data.results)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      navigate(`*`)
    }
  }

  useEffect(() => {
    fetchMoviesByGenre(currentPage)
  }, [currentPage, genre])

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4 xl:grid-cols-6">
        {isLoading ? <Loading /> : movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
      </div>
      <div className="mt-2 flex justify-center">
        {currentPage > 1 && (
          <Button onClick={handlePreviousPage} className="mr-6 flex justify-center font-extrabold">
            {"<"}
          </Button>
        )}
        <Button onClick={handleNextPage} className="flex justify-center font-extrabold">
          {">"}
        </Button>
      </div>
    </div>
  )
}

export default moviesByGenre
