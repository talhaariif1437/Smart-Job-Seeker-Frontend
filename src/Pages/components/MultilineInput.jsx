import React, { useState } from "react";
export default function MultilineInput({
  value,
  heading,
  placeholder,
  handleTextChange,
  bottomText,
  required,
  error,
  id,
  maxLength,
}) {
  return (
    <div className="">
      <label className="block text-black mb-1 text-sm text-start font-semibold leading-6 text-gray-900">
        {heading} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="sm:col-span-full">
        <div className="w-full border-gray-200 bg-white">
          <textarea
            id={id}
            rows="5"
            name={id}
            className={`block w-full p-2 rounded-md text-md text-gray-800 bg-transparent outline-none ring-1 ring-gray-300 ${
              error && value === "" && required
                ? "ring-red-500 focus:ring-red-500"
                : ""
            } `}
            // className={`block w-full p-2 rounded-md text-md text-gray-800 bg-transparent outline-none ring-1 ring-gray-300 `}
            placeholder={placeholder}
            value={value}
            onChange={handleTextChange}
            maxLength={maxLength}
          />
        </div>
        <div className="mt-1 flex justify-content-between">
          <div>
            {error !== "" && value === "" && (
              <p className="text-red-500 text-start text-sm">{error}</p>
            )}
          </div>
          <div>
            <p className="text-[12.5px] text-start">{bottomText} </p>
            
          </div>
        </div>
      </div>
    </div>
  );
}
