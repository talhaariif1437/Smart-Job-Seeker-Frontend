export default function InputField({
     id,
     htmlFor,
     labelText,
     placeholder,
     handleChange,
     value,
     required,
     error,
     type,
   }) {
     return (
       <>
         <label
           htmlFor={htmlFor}
           className="block text-sm text-start font-semibold leading-6 text-gray-900"
         >
           {labelText}
           {required && <span className="text-red-500">*</span>}
         </label>
         <div className="mt-1">
           <input
             type={type ? type : "text"}
             name={id}
             id={id}
             value={value !== undefined ? String(value) : undefined}
             // value={value ? String(value) : ""}
             onChange={handleChange}
             autoComplete="given-name"
             placeholder={placeholder}
             className={`block w-full h-[40px] rounded-md border-0 py-1.5 px-2 text-gray-900 border-2 outline-none ring-[1.5px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1.5px] focus:ring-inset focus:ring-blue-500 sm:text-md sm:leading-6 ${
               error && (value === "" || value === 0) && required
                 ? "ring-red-500 focus:ring-red-500"
                 : ""
             } `}
           />
           {error && (value === "" || value === undefined || value === 0) && (
             <p className="text-red-500 text-start text-sm mt-1">{error}</p>
           )}
         </div>
       </>
     );
   }
   