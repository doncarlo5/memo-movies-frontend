import React from "react";

function Button({ children, className, ...props }) {
  return (
    <button
      className={
        " border-4 px-6 py-2 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-shadow hover:bg-[#000000] hover:text-[#FFFFFF] border-[#000000] " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
