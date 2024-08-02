import React from "react";
// import "../../styles/landingPage.css";

export default function ButtonComponent({ text, onClick }) {
  return (
    <div className="w-full  flex items-center justify-end">
      <button
        onClick={onClick}
        className="bg-blue-500 text-sm hover:bg-darkblue-700 text-white font-bold py-2 px-2 rounded-lg"
      >
        {text}
      </button>
    </div>
  );
}
