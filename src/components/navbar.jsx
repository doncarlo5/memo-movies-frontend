import React, { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

import DropdownMenu from "./dropdown-menu"

function Navbar() {
  const [filter, setFilter] = useState("-1")
  const [params, setSearchParams] = useSearchParams()

  const [theme, setTheme] = useState("light")

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  function handleThemeSwitch() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setSearchParams({ searchBy: e.target.value })
    }
  }

  return (
    <nav className=" bg-parchment max-w-full shadow dark:bg-[#0F1420] dark:text-white">
      <div className=" max-w-* mx-auto flex flex-wrap items-center justify-between p-4">
        <Link to="/" onClick={() => setFilter("-1")}>
          <div className=" ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={theme === "dark" ? "#FFF" : "#212121"}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={theme === "dark" ? "#FFF" : "#212121"}
              className="mx-4 h-10 w-10 transition-transform hover:scale-110"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
              />
            </svg>
          </div>
        </Link>
        <DropdownMenu />

        <select
          className="rounded-md border px-1 py-[0.5159rem] text-center text-sm font-medium shadow-[3px_3px_0px_0px_#212121] outline-none transition-shadow hover:bg-dark-grey hover:text-white hover:shadow-[0px_0px_0px_0px_#212121] focus:outline-none dark:bg-[#0F1420] dark:shadow-[3px_3px_0px_0px_#d6d3d1] dark:hover:shadow-[0px_0px_0px_0px_white]"
          name=""
          id=""
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value)
            setSearchParams({ sortBy: e.target.value })
          }}
        >
          <option value="-1" disabled>
            Sort by
          </option>
          <option value="popularity.desc">Best popularity </option>
          <option value="popularity.asc">Low popularity </option>
          <option value="primary_release_date.desc">Soon release date</option>
          <option value="primary_release_date.asc">Old release date</option>
          <option value="vote_average.desc">Best vote</option>
          <option value="vote_average.asc">Bad vote</option>
          <option value="vote_count.desc">Highest number of votes</option>
          <option value="vote_count.asc">Lowest number of votes</option>
          <option value="revenue.desc">High revenue</option>
          <option value="revenue.asc">Low revenue</option>
        </select>
        <div className="rounded-md bg-gray-200 dark:bg-dark-grey">
          <input
            type="text"
            className="z-0 h-12 w-80 rounded-md border-none pl-5 pr-8 shadow placeholder:text-dark-grey focus:rounded-md focus:opacity-90 focus:outline-none dark:border-white dark:text-dark-grey"
            placeholder="Name of the movie..."
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
        <button
          className="mr-14 rounded-md border border-dark-grey border-opacity-30 px-3 py-[0.125rem] text-2xl text-dark-grey shadow-[3px_3px_0px_0px_#212121] transition-shadow hover:shadow-[0px_0px_0px_0px_#212121] dark:border-white dark:text-white dark:shadow-[3px_3px_0px_0px_#d6d3d1] dark:hover:shadow-[0px_0px_0px_0px_white]"
          onClick={handleThemeSwitch}
        >
          {theme === "dark" ? "☼" : "☾"}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
