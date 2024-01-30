import AllMoviesPage from "./pages/all-movies-page.jsx"
import MovieDetailsPage from "./pages/movie-details-page.jsx"
import Navbar from "./components/navbar.jsx"
import ErrorPage from "./pages/error-page.jsx"

import "./App.css"
import MoviesByGenre from "./pages/movies-by-genre.jsx"
import Footer from "./components/footer.jsx"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="text-foreground  dark:bg-dark-color-mode">
      <Navbar />
      <div className="pb-6 dark:bg-dark-color-mode">
        <Routes>
          <Route path="/" element={<AllMoviesPage />} />
          <Route path="/:genre" element={<MoviesByGenre />} />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
