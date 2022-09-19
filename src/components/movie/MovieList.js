import React, { useRef } from "react";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";

import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { fetcher } from "../../config";
import { createApiByType, createApiSimilarMovie } from "../../helps";
export default function MovieList({ title, query, queryType = "type" }) {
  const prevRef = useRef();
  const nextRef = useRef();
  const { data, error } = useSWR(
    queryType === "type"
      ? createApiByType(query)
      : createApiSimilarMovie(query),
    fetcher
  );

  const isLoading = !data && !error;
  return (
    <div className="pb-20 movie-list">
      <div className="flex items-center justify-between mb-5 text-xl font-bold text-white capitalize md:text-2xl">
        <span>{title}</span>
        {data?.results?.length !== 0 && (
          <div className="flex items-center justify-center gap-x-2">
            <button
              ref={prevRef}
              className="flex items-center justify-center w-8 h-8 text-xl text-white bg-opacity-50 rounded-full bg-slate-700"
            >
              <ion-icon name="chevron-back-outline"></ion-icon>
            </button>
            <button
              ref={nextRef}
              className="flex items-center justify-center w-8 h-8 text-xl text-white bg-opacity-50 rounded-full bg-slate-700"
            >
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
          </div>
        )}
      </div>
      <Swiper
        grabCursor="true"
        spaceBetween={40}
        slidesPerView="auto"
        updateOnWindowResize
      >
        {!isLoading
          ? data?.results?.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard {...movie}></MovieCard>
              </SwiperSlide>
            ))
          : Array(6)
              .fill()
              .map((item, index) => (
                <SwiperSlide key={index}>
                  <MovieCardSkeleton></MovieCardSkeleton>
                </SwiperSlide>
              ))}
      </Swiper>
    </div>
  );
}
