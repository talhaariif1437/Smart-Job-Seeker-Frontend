import { useState } from "react";
import CreatableSelect from 'react-select/creatable';

export default function DropdwonComponent({
  array,
  handleProficiency,
  label,
  placeholder,
  value, // Can be an array for multi-select
  required,
  error,
  id,
  type,
}) {
  const [selectedValue, setSelectedValue] = useState(
    value || (type === "basic-multi-select" ? [] : null) // Initialize based on type
  );

  // Handle value changes and call handleProficiency only on selection updates
  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
    if (selectedOption) {
      handleProficiency(selectedOption); // Pass selected options
    } else {
      handleProficiency([]); // Handle clearing selections
    }
  };

  return (
    <div className="sm:col-span-3">
      <label
        htmlFor={id}
        className="block text-start mb-1.5 text-sm font-medium leading-6 text-gray-900"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <CreatableSelect
        className={`${
          type ? type : "basic-single"
        } mt-[-2.5px] block w-full rounded-md border-0 ring-[1.5px] ring-inset ring-gray-300 text-gray-900 text-start placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
          error && (!value || value.length === 0)
            ? "ring-red-500 focus:ring-red-500"
            : ""
        }`}
        isSearchable={true}
        name={id}
        options={array}
        isMulti
        placeholder={placeholder}
        styles={{
          control: (styles) => ({
            ...styles,
            border:
              error && (!value || value.length === 0)
                ? "1.5px solid rgb(220 38 38)" // Red border for error and empty values
                : "1.5px solid rgb(209 213 219)",
            "&:hover": {
              border:
                error && (!value || value.length === 0)
                  ? "1.5px solid rgb(220 38 38)" // Red hover border for error
                  : "1.5px solid rgb(59 130 246)",
            },
            boxShadow: error && (!value || value.length === 0) && "none", // Apply red box-shadow for error
          }),
        }}
        value={selectedValue} // Use selectedValue for multi-select
        onChange={handleChange}
        required={required}
      />
      {error &&
        (!value || value.length === 0) && ( // Show error for empty or not selected in multi-select
          <p className="text-red-500 text-start text-sm mt-[1px]">{error}</p>
        )}
    </div>
  );
}
