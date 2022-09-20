import React from "react";
import { useFavorite } from "../../contexts/favoriteContext";

export default function ButtonBackDrop({ children, className, data }) {
  // console.log(data.id);
  const [favoriteList, setFavoriteList] = useFavorite();
  const handleToggleList = () => {
    const newArray = [...favoriteList];
    const index = newArray.findIndex((item) => item.id === data.id);
    if (index === -1) {
      console.log(123);
      newArray.push(data);
    } else {
      console.log(123);
      newArray.splice(index, 1);
    }
    setFavoriteList(newArray);
  };
  return (
    <button
      onClick={handleToggleList}
      className={`text-3xl leading-4 text-white bg-white rounded-md bg-opacity-40 backdrop-blur-[2px] ${className} ${
        favoriteList.findIndex((item) => item.id === data.id) !== -1 &&
        "!bg-primary "
      }`}
    >
      {children}
    </button>
  );
}
