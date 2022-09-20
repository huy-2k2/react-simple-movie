import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import "swiper/css";
import HomePage from "./pages/HomePage";
import Main from "./components/layouts/Main";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import { FavoriteProvider } from "./contexts/favoriteContext";
function App() {
  return (
    <Fragment>
      <FavoriteProvider>
        <Routes>
          <Route element={<Main></Main>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/movies" element={<MoviesPage></MoviesPage>}></Route>
            <Route
              path="/movies/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
          </Route>
        </Routes>
      </FavoriteProvider>
    </Fragment>
  );
}

export default App;
