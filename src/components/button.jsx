import React from "react";

function Button({ children, className, ...props }) {
  return (
    <button
      className={
        " dark:text-white font-medium	border-4 border-dark-grey dark:border-white px-6 py-2 shadow-[5px_5px_0px_0px_#212121] dark:shadow-[5px_5px_0px_0px_#d6d3d1] hover:shadow-[0px_0px_0px_0px_#212121] dark:hover:shadow-[0px_0px_0px_0px_white] transition-shadow hover:bg-dark-grey dark:hover:bg-white  hover:text-[#FFFFFF] dark:hover:text-dark-grey " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
