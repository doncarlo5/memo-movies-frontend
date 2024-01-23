import React from "react";

function Button({ children, className, ...props }) {
  return (
    <button
      className={
        " font-medium	border-4 border-dark-grey px-6 py-2 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-shadow hover:bg-dark-grey hover:text-[#FFFFFF] " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
