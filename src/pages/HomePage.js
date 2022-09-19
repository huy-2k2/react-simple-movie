import React, { Fragment } from "react";
import Banner from "../components/banner/Banner";
import MovieList from "../components/movie/MovieList";

export default function HomePage() {
  return (
    <Fragment>
      <Banner></Banner>
      <section className="pb-20 page-container">
        <MovieList title="Now playing" query="now_playing"></MovieList>
        <MovieList title="Top rated" query="top_rated"></MovieList>
        <MovieList title="Popular" query="popular"></MovieList>
      </section>
    </Fragment>
  );
}
