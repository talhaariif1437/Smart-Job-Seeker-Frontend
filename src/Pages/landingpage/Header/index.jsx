import React, { useState } from "react";

const Headernavbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <div className=" max-h-[768px] w-[calc(100%)]  ">
      <nav className="sticky  z-10 block w-full max-w-full px-5   text-white bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-100 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-green-600">
          <a href="/" className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
            Smart Job Seeker
          </a>
          <div className="flex items-center gap-4">
            <div className="hidden mr-4 lg:block">
              <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  <a href="/" className="flex items-center">
                    Home
                  </a>
                </li>
                <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  <a href="/AboutUs" className="flex items-center">
                    About
                  </a>
                </li>
                <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  <a href="/jobcard" className="flex items-center">
                  Jobs
                  </a>
                </li>
                <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  <a href="/InternationlJobs" className="flex items-center">
                    International Jobs
                  </a>
                </li>
                <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  <a href="/jobcard" className="flex items-center">
                    Time Exchange
                  </a>
                </li>
                <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  <a href="/Contactus" className="flex items-center">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-x-1 pr-10">
              <button className="hidden bg-blue-600 px-4 py-2 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block" type="button">
              <a href="/Login" className="flex items-center">
                LOG IN
              </a>
              </button>
              <button className="hidden  select-none  bg-green-600 from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block" type="button">
              <a href="/Login" className="flex items-center text-white">
                SIGN UP
              </a>
              </button>
            </div>
            <button onClick={handleToggle} className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden" type="button">
              <span className="absolute pr-10 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 " fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </nav>
      {navbarOpen && (
        <div className="bg-blue-50 border-t border-blue-200 lg:hidden text-black">
          <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:items-center lg:gap-6">
            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              <a href="#" className="flex items-center">
                HOME
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              <a href="/AboutUs" className="flex items-center">
                ABOUT
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              <a href="/jobcard" className="flex items-center">
                JOBS
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              <a href="/InternationlJobs" className="flex items-center">
                INTERNATIONAL JOBS
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              <a href="" className="flex items-center">
                TIME EXCHANGE
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              <a href="/Contactus" className="flex items-center">
                CONTACT
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Headernavbar;
