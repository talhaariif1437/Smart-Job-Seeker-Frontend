import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
export default function CountryStateCityDropdown({
  array,
  handleProficiency,
  label,
  placeholder,
  value,
  name,
  required,
  error,
  clearable,
  type,
}) {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor="currency"
        className="block text-start mb-1.5  text-sm font-medium leading-6 text-gray-900"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        className={`basic-single mt-[-2.5px] block w-full rounded-md border-0 ring-[1.5px] ring-inset ring-gray-300  text-gray-900 text-start placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
          error && required ? "ring-red-500 focus:ring-red-500" : ""
        } `}
        isClearable={clearable ? true : false}
        isSearchable={true}
        name={name}
        options={array}
        isMulti={type === "basic-multi-select" ? true : false}
        placeholder={placeholder}
        styles={{
          control: (styles) => ({
            ...styles,
            border:
              error && (value === "" || value === null || value === undefined)
                ? "1.5px solid rgb(220 38 38)"
                : "1.5px solid rgb(209 213 219)",
            "&:hover": {
              border:
                error && (value === "" || value === null || value === undefined)
                  ? "1.5px solid rgb(220 38 38)"
                  : "1.5px solid rgb(59 130 246)",
            },
            boxShadow:
              error &&
              (value === "" || value === null || value === undefined) &&
              "none", // Apply red box-shadow for error
          }),
        }}
        value={value}
        onChange={handleProficiency}
        required={required}
      />
      {error && (value === "" || value === null || value === undefined) && (
        <p className="text-red-500 text-start text-sm mt-[1px]">{error}</p>
      )}
    </div>
  );
}