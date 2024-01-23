import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/button";
import { languageCountryMap } from "../constants/langue-code";
import Pill from "../components/pill";

const API_COMMENTS = "https://memo-movies-backend.vercel.app/comments?movieId=";

function getFlagUrl(lang) {
  return `http://purecatamphetamine.github.io/country-flag-icons/3x2/${languageCountryMap[lang]}.svg`;
}

function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userComment, setUserComment] = useState("");

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
      const responseComment = await axios.get(`${API_COMMENTS}${movieId}`);
      setComments(responseComment.data);
      setMovie(response.data);
      setIsLoading(false);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchOneMovie();
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!userComment) {
      return;
    }
    const newComment = {
      body: userComment,
      movieId,
    };
    try {
      const responsePost = await axios.post(
        "https://memo-movies-backend.vercel.app/comments",
        newComment
      );
      console.log(responsePost);
      fetchOneMovie();
    } catch (error) {
      console.error(error);
    }
    setUserComment("");
    fetchOneMovie();
  }

  async function handleDelete(commentId) {
    try {
      const response = await axios.delete(
        `https://memo-movies-backend.vercel.app/comments/${commentId}`
      );
      fetchOneMovie();
    } catch (error) {
      console.error(error);
    }
  }

  if (!comments) {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
          <div className=" flex p-5 items-center justify-center gap-10">
            <img
              className=" rounded-md h-auto max-w-full "
              src={`${imageBaseUrl}${movie.poster_path}`}
              alt={movie.title}
            />
            <div className=" flex flex-col">
              <h3 className=" text-4xl font-black mb-1">{movie.title}</h3>
              <p className=" font-light mb-2"> {movie.tagline}</p>
              <div className=" mb-6">
                <img
                  className=" w-8 rounded-sm"
                  src={getFlagUrl(movie.original_language)}
                  alt={movie.original_language}
                />
              </div>
              <div className=" flex">
                <p className=" mb-3 mr-1">Vote average :</p>
                <p className=" font-light mr-1">{movie.vote_average}</p>
                <p className=" font-light"> / 10</p>
              </div>
              <div className=" flex">
                <p className=" mb-3 mr-1">Release date :</p>
                <p className=" font-light">{movie.release_date}</p>
              </div>
              <p className="">Storyline :</p>{" "}
              <p className=" font-light max-w-lg mb-6 text-sm">
                {movie.overview}
              </p>
              {/* <div className=" flex">
                <p className=" mb-3 mr-1">Revenue :</p>
                <p className=" font-light mr-1">{movie.revenue}</p>
                <p className=" font-light"> $</p>
              </div> */}
              <div className=" mb-6 flex flex-wrap gap-2">
                {" "}
                <p>Product Companies :</p>
                {movie.production_companies.map((productCompanies) => (
                  <span className=" font-light" key={productCompanies.id}>
                    {productCompanies.name}
                  </span>
                ))}
              </div>
              <div className=" flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <Pill key={genre.id}>{genre.name}</Pill>
                ))}
              </div>
              <hr className=" flex w-10 text-grey-pill" />
              <div>
                <p className=" italic font-bold mt-2 mb-2">My comments :</p>
                {comments.map((comment) => {
                  return (
                    <div key={comment.id} className=" flex ml-3">
                      <p>{comment.body}</p>
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="ml-2 bg-white-grey opacity-0 hover:opacity-100"
                      >
                        x
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className=" mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="w-full border border-dark-grey rounded-lg">
                    <label htmlFor="comment"></label>
                    <textarea
                      id="comment"
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="block w-full rounded  px-3 py-2  outline"
                      rows="3"
                    ></textarea>
                  </div>
                  <button
                    className=" font-light border-2 border-dark-grey px-2 ml-1 mt-2  rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-shadow hover:bg-dark-grey hover:text-[#FFFFFF] "
                    type="submit"
                  >
                    Add comment
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="flex justify-center p-4">
            <Button
              className=" "
              onClick={() => {
                navigate(-1);
              }}
            >
              ⬅︎ Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetailsPage;
