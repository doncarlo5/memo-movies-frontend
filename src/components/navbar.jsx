import React from "react";
import { Link } from "react-router-dom";
import Search from "./search";
import DropdownMenu from "./dropdown-menu";

function Navbar() {
  return (
    <nav className=" bg-parchment max-w-full shadow">
      <div className=" max-w-* flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <img
            src="../../../public/favicon.svg"
            className="h-10 hover:scale-110 transition-transform"
            alt="MemoMovies Logo"
          />
        </Link>
        <DropdownMenu></DropdownMenu>
        <Search></Search>
        <h1>Memo Movies</h1>
      </div>
    </nav>
  );
}

export default Navbar;
