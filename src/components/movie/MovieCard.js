import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "../../contexts/favoriteContext";
import { createImageUrl } from "../../helps";
import Button from "../button/Button";
import ButtonBackDrop from "../button/ButtonBackDrop";

const MovieCardSkeleton = () => {
  return (
    <div className="relative flex flex-col h-full p-3 text-white rounded-lg select-none bg-slate-800">
      <div className="flex flex-col flex-grow">
        <div className="relative h-[250px] rounded-lg overflow-hidden mb-5">
          <div className="w-full h-full bg-gray-100 animate-pulse"></div>
          <button className="absolute p-2 text-3xl leading-4 text-white bg-white rounded-md bg-opacity-40 backdrop-blur-[2px] top-2 right-2">
            +
          </button>
        </div>
        <span className="w-full h-5 mb-5 bg-gray-100 animate-pulse"></span>
      </div>
      <div className="flex items-center justify-between mb-10 text-sm opacity-50">
        <span className="w-10 h-5 bg-gray-100 animate-pulse"></span>
        <span className="flex items-center justify-center gap-x-2">
          <span className="w-10 h-5 bg-gray-100 animate-pulse"></span>
          <ion-icon
            style={{ color: "#fbd755", fontSize: "24px" }}
            name="star"
          ></ion-icon>
        </span>
      </div>
      <Button>Watch now</Button>
    </div>
  );
};

export default function MovieCard({
  release_date,
  original_title,
  poster_path,
  backdrop_path,
  vote_average,
  id,
}) {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col h-full p-3 text-white rounded-lg select-none bg-slate-800">
      <div className="flex flex-col flex-grow">
        <div className="relative h-[250px] rounded-lg overflow-hidden mb-5">
          <img
            className="object-cover w-full h-full"
            src={createImageUrl(poster_path || backdrop_path, "w500")}
            alt=""
          />
          <ButtonBackDrop
            className={`absolute p-3 top-2 right-2`}
            data={{
              release_date,
              original_title,
              poster_path,
              backdrop_path,
              vote_average,
              id,
            }}
          >
            +
          </ButtonBackDrop>
        </div>
        <h3 className="mb-5 text-xl font-bold line-clamp-2">
          {original_title}
        </h3>
      </div>
      <div className="flex items-center justify-between mb-10 text-sm opacity-50">
        <span>{new Date(release_date).getFullYear()}</span>
        <span className="flex items-center justify-center gap-x-2">
          <span className="mt-1">{vote_average}</span>
          <ion-icon
            style={{ color: "#fbd755", fontSize: "24px" }}
            name="star"
          ></ion-icon>
        </span>
      </div>
      <Button onClick={() => navigate(`/movies/${id}`)}>Watch now</Button>
    </div>
  );
}

export { MovieCardSkeleton };
