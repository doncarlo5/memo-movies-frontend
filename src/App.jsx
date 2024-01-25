import { Routes, Route } from "react-router-dom";
import AllMoviesPage from "./pages/all-movies-page.jsx";
import MovieDetailsPage from "./pages/movie-details-page.jsx";
import MoviesByGenre from "./pages/movies-by-genre.jsx";
import Navbar from "./components/navbar.jsx";
import SortedMovies from "./pages/sorted-movies.jsx";
import "./App.css";

function App() {
  return (
    <div className="text-foreground  dark:bg-dark-color-mode">
      <Navbar />
      <div className=" pb-6 dark:bg-dark-color-mode">
        <Routes>
          <Route path="/" element={<AllMoviesPage />} />
          <Route path="/:genre" element={<MoviesByGenre />} />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
          <Route path="/sortedby/" element={<SortedMovies />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
