import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Search from "./search";
import DropdownMenu from "./dropdown-menu";
import axios from "axios";

function Navbar({ fetchSearchMovies }) {
  const [filter, setFilter] = useState("-1");
  const [params, setSearchParams] = useSearchParams();

  // async function fetchBySort() {
  //   const API_KEY = import.meta.env.VITE_KEY_API_URL;

  //   const headers = {
  //     Authorization: `Bearer ${API_KEY}`,
  //     accept: "application/json",
  //   };

  //   try {
  //     const response = await axios.get(
  //       `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${filter}`,
  //       {
  //         headers,
  //       }
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   if (filter === "-1") return;
  //   fetchBySort();
  // }, [filter]);

  return (
    <nav className=" bg-parchment max-w-full shadow">
      <div className=" max-w-* flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <img
            src="/images/favicon.svg"
            className="h-10 hover:scale-110 transition-transform"
            alt="MemoMovies Logo"
          />
        </Link>
        <DropdownMenu />

        <select
          name=""
          id=""
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setSearchParams({ sortBy: e.target.value });
          }}
        >
          <option value="-1" disabled>
            Filter by
          </option>
          <option value="popularity.asc">Filter by pop ascending</option>
          <option value="rating.desc">Filter by ratin descending</option>
          <option value="popularity.desc">Filter by pop descending</option>
          <option value="rating.asc">Filter by rating ascending</option>
        </select>
        <Search fetchSearchMovies={fetchSearchMovies} />
        <h1>Memo Movies</h1>
      </div>
    </nav>
  );
}

export default Navbar;
