import React from "react";
import { Link } from "react-router-dom";
import { genres } from "../constants/genres";

function Pill({ children, id }) {
  const movieGenre = genres.find((el) => el.id === id);

  return (
    <Link to={`/${movieGenre.name}`}>
      <div className=" rounded-full px-2 bg-grey-pill dark:text-white dark:bg-[#0F1420] cursor-pointer">
        #{children}
      </div>
    </Link>
  );
}

export default Pill;
