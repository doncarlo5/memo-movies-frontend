import React from "react"
import { Link } from "react-router-dom"

import { genres } from "../constants/genres"

function Pill({ children, id }) {
  const movieGenre = genres.find((el) => el.id === id)

  return (
    <Link to={`/${movieGenre.name}`}>
      <div className=" cursor-pointer rounded-full bg-grey-pill px-2 dark:bg-[#0F1420] dark:text-white">
        #{children}
      </div>
    </Link>
  )
}

export default Pill
