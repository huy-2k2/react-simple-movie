import React, { Fragment } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { fetcher } from "../config";
import { createApiByType, createApiSearchMovie } from "../helps";
import useDebounce from "../hooks/useDebounce";

const PaginateItem = ({ index, page, setPage }) => {
  return (
    <span
      onClick={() => setPage(index + 1)}
      key={index}
      className={`${
        index + 1 === page ? "bg-primary text-white " : "bg-white text-black "
      }md:px-4 md:py-2 px-2 py-1 md:text-lg text-sm leading-none rounded-md cursor-pointer select-none`}
    >
      {index + 1}
    </span>
  );
};

const PaginateMovie = ({
  handlePrevPage,
  handleNextPage,
  totalPage,
  page,
  setPage,
  totalDisplay = 5,
}) => {
  return (
    <div className="flex items-center justify-center text-white gap-x-4">
      <button
        onClick={handlePrevPage}
        className={`${
          page === 1 ? "opacity-50 cursor-default " : ""
        }flex items-center justify-center text-3xl`}
      >
        <ion-icon name="chevron-back-outline"></ion-icon>
      </button>
      {Array(totalPage)
        .fill()
        .slice(0, totalDisplay)
        .map((item, index) => (
          <PaginateItem
            index={index}
            page={page}
            setPage={setPage}
            key={index}
          ></PaginateItem>
        ))}
      {totalPage > totalDisplay && (
        <Fragment>
          <span
            className={`text-[32px] leading-none ${
              page > totalDisplay && page !== totalPage && "text-primary"
            }`}
          >
            <ion-icon name="ellipsis-horizontal"></ion-icon>
          </span>
          <PaginateItem
            index={totalPage - 1}
            page={page}
            setPage={setPage}
          ></PaginateItem>
        </Fragment>
      )}
      <button
        onClick={handleNextPage}
        className={`${
          page >= totalPage ? "opacity-50 cursor-default " : ""
        }flex items-center justify-center text-3xl`}
      >
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </button>
    </div>
  );
};

export default function MoviesPage() {
  const inputSearchRef = useRef();
  const [page, setPage] = useState(1);
  const { data, error } = useSWR(createApiByType("upcoming", page), fetcher);
  const [search, setSearch] = useState("");
  const { debounce: searchDebounce, setDebounce: setSearchDebounce } =
    useDebounce(search, 1000);
  const { data: dataSearch, error: errorSearch } = useSWR(
    createApiSearchMovie(searchDebounce, page),
    fetcher
  );
  useEffect(() => setPage(1), [searchDebounce]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSetSubmitSearch = () => {
    setSearchDebounce(inputSearchRef.current?.value);
  };

  const handleNextPage = () => {
    if (page >= totalPage) return;
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const currentData = searchDebounce ? dataSearch : data;
  const isLoading = searchDebounce
    ? !dataSearch && !errorSearch
    : !data && !error;
  const totalPage = searchDebounce
    ? dataSearch?.total_pages
    : data?.total_pages;
  return (
    <div className="py-10 page-container">
      <div className="flex justify-center mb-10">
        <div className="flex-grow">
          <input
            ref={inputSearchRef}
            onChange={handleSearchChange}
            value={search}
            className="w-full p-4 text-white outline-none bg-slate-800"
            type="text"
            placeholder="type to search"
          />
        </div>

        <button
          className="flex items-center justify-center px-6 text-white text-md gap-x-2 bg-primary"
          onClick={handleSetSubmitSearch}
        >
          <ion-icon
            style={{ fontSize: "28px" }}
            name="search-outline"
          ></ion-icon>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-10 mb-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {!isLoading
          ? currentData?.results?.map((item) => (
              <MovieCard key={item.id} {...item}></MovieCard>
            ))
          : Array(4)
              .fill(null)
              .map((item, index) => (
                <MovieCardSkeleton key={index}></MovieCardSkeleton>
              ))}
      </div>
      <PaginateMovie
        {...{
          handlePrevPage,
          handleNextPage,
          totalPage,
          page,
          setPage,
          totalDisplay: 4,
        }}
      ></PaginateMovie>
    </div>
  );
}
