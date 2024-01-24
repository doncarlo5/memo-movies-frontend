import React from "react";
import { Link } from "react-router-dom";
import { genres } from "../constants/genres";

function Pill({ children, id }) {
  const movieGenre = genres.find((el) => el.id === id);

  return (
    <Link to={`/${movieGenre.name}`}>
      <div className="font-light rounded-full px-2 bg-grey-pill">
        #{children}
      </div>
    </Link>
  );
}

export default Pill;