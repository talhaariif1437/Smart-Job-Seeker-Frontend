import React from "react";

export default function AddMoreBtn({ handleClick }) {
  return (
    <div className="flex justify-end items-center">
      <button
        className="bg-blue-800 py-2 px-3 mt-2 rounded text-white font-bold"
        onClick={handleClick}
      >
        Add more
      </button>
    </div>
  );
}