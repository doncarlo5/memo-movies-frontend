import React from "react";

function Pill({ children }) {
  return (
    <div className="font-light rounded-full px-2 bg-grey-pill">#{children}</div>
  );
}

export default Pill;
