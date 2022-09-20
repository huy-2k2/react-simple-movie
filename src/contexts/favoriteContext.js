import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const FavoriteContext = createContext();

const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (typeof context === "undefined")
    throw new Error("useFavorite must be used within FavoriteProvider");
  return context;
};

const FavoriteProvider = ({ children, ...props }) => {
  const [favoriteList, setFavoriteList] = useState([]);
  return (
    <FavoriteContext.Provider
      value={[favoriteList, setFavoriteList]}
      {...props}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export { useFavorite, FavoriteProvider };
