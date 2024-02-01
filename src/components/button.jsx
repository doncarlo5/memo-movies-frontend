import React from "react"

function Button({ children, className, ...props }) {
  return (
    <button
      className={
        " border-4 border-dark-grey	px-6 py-2 font-medium shadow-[5px_5px_0px_0px_#212121] transition-shadow hover:bg-dark-grey hover:text-[#FFFFFF] hover:shadow-[0px_0px_0px_0px_#212121] dark:border-white dark:text-white dark:shadow-[5px_5px_0px_0px_#d6d3d1] dark:hover:bg-white  dark:hover:text-dark-grey dark:hover:shadow-[0px_0px_0px_0px_white] " +
        className
      }
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
