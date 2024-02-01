import React, { useState } from "react"
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom"

import { genres } from "../constants/genres"

const DropdownMenu = () => {
  const [isDropdownVisible, setDropdownVisibility] = useState(false)

  const toggleDropdown = () => {
    setDropdownVisibility(!isDropdownVisible)
  }

  function closeDropdown() {
    setDropdownVisibility(false)
  }

  const match = useMatch("/:genre")

  const formattedGenre = match?.params?.genre
    ? match.params.genre.charAt(0).toUpperCase() + match.params.genre.slice(1)
    : null

  const navigate = useNavigate()

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="inline-flex w-[173px] items-center justify-center rounded-lg border px-6 py-2 text-center text-sm font-medium shadow-[3px_3px_0px_0px_#212121] outline-none transition-shadow hover:bg-[#0F1420] hover:text-[#FFFFFF] hover:shadow-[0px_0px_0px_0px_#212121] focus:outline-none dark:shadow-[5px_5px_0px_0px_#d6d3d1] dark:hover:shadow-[0px_0px_0px_0px_#FFFFFF]"
      >
        {formattedGenre ?? "Genre"}
        <svg
          className={`ms-3 h-2.5 w-2.5 transform ${
            isDropdownVisible ? "-rotate-180" : ""
          } transition duration-150 ease-in-out`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>
      <ul
        className={`scale-0 transform rounded-sm border bg-white dark:bg-dark-grey ${
          isDropdownVisible ? "scale-100" : ""
        } absolute z-10 max-h-96 min-w-32 origin-top overflow-y-scroll transition duration-150 ease-in-out`}
      >
        {genres.map((genre) => (
          <Link key={genre.id} to={genre.name} onClick={closeDropdown}>
            <li className=" rounded-sm px-6 py-2 transition duration-150 ease-in-out hover:bg-dark-grey hover:text-[#FFFFFF] dark:bg-[#0F1420] dark:hover:bg-white dark:hover:text-dark-grey ">
              {genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default DropdownMenu
