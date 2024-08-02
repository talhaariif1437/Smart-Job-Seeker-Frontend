import React, { useState } from "react";
export default function ParagraphInput({
  value,
  heading,
  placeholder,
  handleTextChange,
  bottomText,
  id,
  maxLength,
}) {
  return (
    <div className="mb-3">
      <label className="block mt-5 mb-2 text-md text-start font-semibold leading-6 text-gray-900">
        {heading}
      </label>

      <div className="sm:col-span-full">
        <div className="w-full border-gray-200 bg-white">
          <textarea
            id={id}
            rows="5"
            className={`block w-full p-2 rounded-md text-md text-gray-800 bg-transparent outline-none ring-1 ring-gray-300 `}
            placeholder={placeholder}
            value={value}
            onChange={handleTextChange}
            maxLength={maxLength}
          />
        </div>
        <div className="mt-2 flex justify-content-between">
          <p className="text-[12.5px] text-start">{bottomText} </p>
          <p className="text-[12.5px]">
            {value?.length}/{maxLength}
          </p>
        </div>
      </div>
    </div>
  );
}