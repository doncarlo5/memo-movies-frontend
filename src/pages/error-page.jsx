import React, { useState } from "react";
import "./error-page.css";

function ErrorPage() {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleImageClick = () => {
    setIsBouncing(true);

    setTimeout(() => {
      setIsBouncing(false);
    }, 500);
  };

  return (
    <div className=" cursor-help flex justify-center mt-32 h-screen ">
      <div className="flex flex-col items-center ">
        <div className={`mb-4 ${isBouncing ? "animate-shake" : ""}`}>
          <img
            className="rounded cursor-pointer shadow-blue-950 shadow-2xl"
            src="/matrix-gif.gif"
            alt="gif matrix"
            onClick={handleImageClick}
          />
        </div>

        <div>
          <h2
            className={`font-vt323 mt-6 cursor-help text-6xl font-black ${
              isBouncing ? "animate-shake" : ""
            }`}
            onClick={handleImageClick}
          >
            You are lost
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
