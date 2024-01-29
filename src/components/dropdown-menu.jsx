import React, { useState } from "react";
import { genres } from "../constants/genres";
import { Link, useMatch, useLocation, useNavigate } from "react-router-dom";

const DropdownMenu = () => {
  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisibility(!isDropdownVisible);
  };

  function closeDropdown() {
    setDropdownVisibility(false);
  }

  const match = useMatch("/:genre");

  const formattedGenre = match?.params?.genre
    ? match.params.genre.charAt(0).toUpperCase() + match.params.genre.slice(1)
    : null;

  const navigate = useNavigate();

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="outline-none focus:outline-none border px-6 py-2 shadow-[3px_3px_0px_0px_#212121] dark:shadow-[5px_5px_0px_0px_#d6d3d1] dark:hover:shadow-[0px_0px_0px_0px_#FFFFFF] hover:shadow-[0px_0px_0px_0px_#212121]  transition-shadow hover:bg-[#0F1420] hover:text-[#FFFFFF] font-medium rounded-lg text-sm text-center inline-flex items-center"
      >
        {formattedGenre ?? "Genre"}
        <svg
          className={`w-2.5 h-2.5 ms-3 transform ${
            isDropdownVisible ? "-rotate-180" : ""
          } transition duration-150 ease-in-out`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <ul
        className={`bg-white dark:bg-dark-grey border rounded-sm transform scale-0 ${
          isDropdownVisible ? "scale-100" : ""
        } z-10 absolute transition duration-150 ease-in-out origin-top min-w-32 overflow-y-scroll max-h-96`}
      >
        {genres.map((genre) => (
          <Link key={genre.id} to={genre.name} onClick={closeDropdown}>
            <li className="rounded-sm px-6 py-2 dark:bg-[#0F1420] dark:hover:bg-white dark:hover:text-dark-grey hover:bg-dark-grey hover:text-[#FFFFFF] transition duration-150 ease-in-out ">
              {genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
