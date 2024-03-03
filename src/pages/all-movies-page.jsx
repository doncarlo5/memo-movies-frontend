import React, { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

import Button from "../components/button"
import Loading from "../components/loading"
import MovieCard from "../components/movie-card"
import { discoveryApi, searchApi } from "./../api/apiHandler"

function AllMoviesPage() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)
  const [results, setResults] = useState(null)

  const [params, setSearchParams] = useSearchParams()
  const sortBy = params.get("sortBy")
  const searchBy = params.get("searchBy")

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

  async function fetchAllMovies() {
    let apiToUse = discoveryApi
    let URL_PARAMS = ""

    if (sortBy) {
      URL_PARAMS += `&sort_by=${sortBy}`
      console.log("SORT", sortBy)
    }

    if (searchBy) {
      apiToUse = searchApi
      URL_PARAMS = `movie?query=${searchBy}`
    }

    URL_PARAMS += `&page=${currentPage}`

    try {
      const response = await apiToUse.api.get(URL_PARAMS)
      setMovies(response.data.results)
      setTotalPages(response.data.total_pages)
      setResults(response.data.total_results)
      setIsLoading(false)
      console.log("response 🔽", response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAllMovies(currentPage)
  }, [currentPage, sortBy, searchBy])

  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  return (
    <div className=" dark:bg-dark-color-mode">
      {results && (
        <div className="flex justify-center p-3 text-sm font-extralight opacity-80 dark:text-white-grey">
          <p>{`${numberWithSpaces(results)} results`}</p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 dark:bg-dark-color-mode md:grid-cols-4 xl:grid-cols-6">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
        )}
      </div>
      {totalPages && (
        <div className="flex justify-center p-5 font-extralight opacity-80 dark:text-white-grey">
          <p>{`Page ${currentPage} of ${totalPages}`}</p>
        </div>
      )}
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

export default AllMoviesPage
