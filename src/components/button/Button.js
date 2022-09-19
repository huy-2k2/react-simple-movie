import React from "react";

export default function Button({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-full px-6 py-3 capitalize rounded-lg gap-x-2 bg-primary ${className}`}
    >
      <span>{children}</span>
      <ion-icon style={{ fontSize: "32px" }} name="play-circle"></ion-icon>
    </button>
  );
}
