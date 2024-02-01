import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

import { oneMovieApi } from "../api/apiHandler"
import Button from "../components/button"
import Loading from "../components/loading"
import Pill from "../components/pill"
import { languageCountryMap } from "../constants/langue-code"

const API_COMMENTS = "https://memo-movies-backend.vercel.app/comments?movieId="

const svgDeleteButton = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)

function getFlagUrl(lang) {
  if (languageCountryMap[lang]) {
    return `http://purecatamphetamine.github.io/country-flag-icons/3x2/${languageCountryMap[lang]}.svg`
  } else {
    return
  }
}

function MovieDetailsPage() {
  const { movieId } = useParams()

  const [movie, setMovie] = useState(null)
  const [comments, setComments] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userComment, setUserComment] = useState("")

  const navigate = useNavigate()
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500"

  async function fetchOneMovie() {
    try {
      const response = await oneMovieApi.api.get(movieId)
      const responseComment = await axios.get(`${API_COMMENTS}${movieId}`)
      setComments(responseComment.data)
      setMovie(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchOneMovie()
  }, [])

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!userComment) {
      return
    }
    const newComment = {
      body: userComment,
      movieId,
    }
    try {
      const responsePost = await axios.post("https://memo-movies-backend.vercel.app/comments", newComment)
      fetchOneMovie()
    } catch (error) {
      console.error(error)
    }
    setUserComment("")
    fetchOneMovie()
  }

  function formatDate(dateString) {
    const options = { day: "numeric", month: "numeric", year: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  async function handleDelete(commentId) {
    try {
      const response = await axios.delete(`https://memo-movies-backend.vercel.app/comments/${commentId}`)
      fetchOneMovie()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div>
          <div className=" flex items-center justify-center gap-10 p-5 dark:bg-dark-color-mode dark:text-white">
            <img
              className=" h-auto max-w-full rounded-md "
              src={`${imageBaseUrl}${movie.poster_path}`}
              alt={movie.title}
            />
            <div className=" flex flex-col">
              <h3 className=" mb-1 text-4xl font-black">{movie.title}</h3>
              <p className=" mb-2 font-light"> {movie.tagline}</p>
              <div className=" mb-6">
                <img
                  className=" w-8 rounded-sm"
                  src={getFlagUrl(movie.original_language)}
                  alt={movie.original_language}
                />
              </div>
              <div className=" flex">
                <p className=" mb-3 mr-1">Vote average :</p>
                <p className=" mr-1 font-light">{movie.vote_average.toFixed(1)}</p>
                <p className=" font-light"> / 10</p>
              </div>
              <div className=" flex">
                <p className=" mb-3 mr-1">Release date :</p>
                <p className=" font-light">{formatDate(movie.release_date)}</p>
              </div>
              <p className="">Storyline :</p> <p className=" mb-6 max-w-lg text-sm font-light">{movie.overview}</p>
              <div className=" mb-6 flex max-w-xl flex-wrap gap-2">
                {" "}
                <p>Product Companies :</p>
                {movie.production_companies.map((productCompanies, index) => (
                  <span className=" font-light" key={productCompanies.id}>
                    {productCompanies.name}
                    {index < movie.production_companies.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
              <div className=" mb-6 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Pill id={genre.id} key={genre.id}>
                    {genre.name}
                  </Pill>
                ))}
              </div>
              <hr className=" flex w-10 text-grey-pill" />
              <div>
                <p className=" mb-2 mt-2 font-bold italic">My comments :</p>
                {comments.map((comment) => {
                  return (
                    <div key={comment.id} className="group ml-3 flex">
                      <p>{comment.body}</p>
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="ml-3 scale-90 opacity-0 transition delay-500 ease-in-out hover:scale-100 hover:text-red-800 group-hover:opacity-100"
                      >
                        {svgDeleteButton}
                      </button>
                    </div>
                  )
                })}
              </div>
              <div className=" mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="w-full rounded-lg border border-dark-grey">
                    <label htmlFor="comment"></label>
                    <textarea
                      id="comment"
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="block w-full rounded  px-3 py-2  outline dark:text-dark-grey"
                      rows="3"
                    ></textarea>
                  </div>
                  <button
                    className="ml-1 mt-2 rounded-md border-2 border-dark-grey px-2 font-light  shadow-[2px_2px_0px_0px_#212121] transition-shadow hover:bg-dark-grey   hover:text-[#FFFFFF] hover:shadow-[0px_0px_0px_0px_#212121] dark:border-white dark:bg-[#0F1420] dark:shadow-[2px_2px_0px_0px_#D5D3D1] dark:hover:shadow-[0px_0px_0px_0px_white] "
                    type="submit"
                  >
                    Add comment
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="flex justify-center p-4 dark:bg-dark-color-mode">
            <Button
              className=" "
              onClick={() => {
                navigate(-1)
              }}
            >
              ⬅︎ Back
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetailsPage
