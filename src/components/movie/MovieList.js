import React, { useRef } from "react";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";

import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { fetcher } from "../../config";
import { createApiByType, createApiSimilarMovie } from "../../helps";
import { Navigation } from "swiper";
import "swiper/css/navigation";
export default function MovieList({ title, query, queryType = "type" }) {
  const { data, error } = useSWR(
    queryType === "type"
      ? createApiByType(query)
      : createApiSimilarMovie(query),
    fetcher
  );

  const isLoading = !data && !error;
  return (
    <div className="pb-20 movie-list">
      <p className="mb-5 text-xl font-bold text-white capitalize md:text-2xl">
        {title}
      </p>
      <Swiper
        navigation={true}
        grabCursor={true}
        modules={[Navigation]}
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
