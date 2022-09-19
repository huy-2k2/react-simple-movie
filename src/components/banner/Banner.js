import useSWR from "swr";
import { fetcher } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";
import { genreFilms } from "../../assets/data";
import { createApiByType, createImageUrl } from "../../helps";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
const BannerItem = ({
  original_title,
  poster_path,
  backdrop_path,
  genre_ids,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
      <img
        className="object-cover w-full h-full"
        src={createImageUrl(backdrop_path || poster_path)}
        alt=""
      />
      <div className="absolute w-full text-white bottom-5 left-5">
        <h2 className="mb-3 text-xl font-bold md:text-3xl">{original_title}</h2>
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {genre_ids?.map((genre_id) => {
            const filmName = genreFilms.find(
              (genreFilm) => genreFilm.id === genre_id
            )?.name;
            return (
              <span
                key={genre_id}
                className="px-4 py-2 border border-white rounded-md"
              >
                {filmName}
              </span>
            );
          })}
        </div>
        <div className="flex justify-start gap-x-3">
          <Button className="w-auto" onClick={() => navigate(`/movies/${id}`)}>
            Watch now
          </Button>
          <button className=" w-14 text-[36px] leading-4 text-white bg-white rounded-md bg-opacity-20 backdrop-blur-[2px]">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Banner() {
  const { data, error } = useSWR(createApiByType("upcoming"), fetcher);
  return (
    <section className="h-[500px] page-container mb-20 overflow-hidden banner">
      <Swiper grabCursor="true" slidesPerView="auto">
        {data?.results?.map((item) => (
          <SwiperSlide key={item.id}>
            <BannerItem {...item}></BannerItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
