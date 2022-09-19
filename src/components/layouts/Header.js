import React from "react";
import { NavLink } from "react-router-dom";

const listLink = [
  { id: 1, to: "/", title: "Home" },
  { id: 2, to: "/movies", title: "Movies" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-center py-5 text-white select-none gap-x-5 md:py-10 md:mb-5">
      {listLink.map((link) => (
        <NavLink
          end
          to={link.to}
          key={link.id}
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          {link.title}
        </NavLink>
      ))}
    </header>
  );
}
