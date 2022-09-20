import React from "react";
import { useFavorite } from "../../contexts/favoriteContext";
import { SwiperSlide, Swiper } from "swiper/react";

import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { Navigation } from "swiper";
import "swiper/css/navigation";
export default function MovieFavoriteList({ title = "Favorite" }) {
  const [favoriteList] = useFavorite();
  return favoriteList.length ? (
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
        {favoriteList.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard {...movie}></MovieCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : (
    ""
  );
}
