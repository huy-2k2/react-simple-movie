import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import MovieList from "../components/movie/MovieList";
import { fetcher } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import {
  createApiActor,
  createApiById,
  createApiVideo,
  createImageUrl,
} from "../helps";

const SimilarMovie = ({ movieId }) => {
  return (
    <div className="py-10">
      <MovieList
        title="Similar"
        query={movieId}
        queryType="similar"
      ></MovieList>
    </div>
  );
};

const MovieVideo = ({ movieId }) => {
  const { data, error } = useSWR(createApiVideo(movieId), fetcher);
  return (
    <div className="flex flex-col gap-10 py-10">
      {data?.results?.slice(0, 2).map((item) => (
        <div key={item.id} className="w-full aspect-auto">
          <h3 className="text-lg font-bold text-secondary">{item.name}</h3>
          <div className="w-full aspect-video">
            <iframe
              className="object-fill w-full h-full"
              width="942"
              height="530"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="BLACKPINK - ‘Shut Down’ M/V"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
};

const CastItem = ({ profile_path, name }) => {
  return (
    <div className="w-full select-none">
      <img
        src={createImageUrl(profile_path)}
        alt=""
        className="w-full h-[350px] object-cover rounded-lg mb-2"
      />
      <h3 className="text-xl text-center text-white">{name}</h3>
    </div>
  );
};

const MovieCredits = ({ movieId }) => {
  const { data, error } = useSWR(createApiActor(movieId), fetcher);
  return (
    // <div className="py-10">
    //   <h2 className="mb-5 text-3xl text-center text-white">Casts</h2>
    //   <div className="grid grid-cols-4 gap-5">
    //     {data?.cast?.slice(0, 4).map((item) => (
    //       <CastItem key={item.id} {...item}></CastItem>
    //     ))}
    //   </div>
    // </div>
    <div className="cast-list">
      <Swiper
        grabCursor="true"
        spaceBetween={40}
        slidesPerView="auto"
        updateOnWindowResize
      >
        {data?.cast?.map((item) => (
          <SwiperSlide key={item.id}>
            <CastItem {...item}></CastItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const { data, error } = useSWR(createApiById(movieId), fetcher);
  return (
    <div className="py-5">
      <div className="relative w-full h-[300px] md:h-[600px] mb-10 md:mb-0">
        <div
          style={{
            backgroundImage: `url(${createImageUrl(
              data?.backdrop_path || data?.poster_path
            )})`,
          }}
          className="w-full h-full bg-center bg-no-repeat bg-cover"
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>
      <div className="w-full hidden md:block h-[400px] max-w-[800px] mx-auto relative z-10 mt-[-200px] pb-10">
        <img
          className="object-cover w-full h-full rounded-lg"
          src={createImageUrl(data?.poster_path || data?.backdrop_path)}
          alt=""
        />
      </div>
      <h1 className="mb-10 text-xl font-bold text-center text-white md:text-3xl">
        {data?.original_title}
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-5 mb-10">
        {data?.genres?.map((item) => (
          <span
            className="px-4 py-2 border border-primary text-primary rounded-[4px] text-white"
            key={item.id}
          >
            {item.name}
          </span>
        ))}
      </div>
      <p className="text-sm leading-relaxed text-center text-white w-full max-w-[600px] mx-auto mb-10">
        {data?.overview}
      </p>
      <MovieCredits movieId={movieId}></MovieCredits>
      <MovieVideo movieId={movieId}></MovieVideo>
      <SimilarMovie movieId={movieId}></SimilarMovie>
    </div>
  );
}
