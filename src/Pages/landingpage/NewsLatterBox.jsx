import React from "react";

const NewsLatterBox = () => {
  const theme = "light"; // You may replace "light" with the actual theme value

  return (
    <div
      className={` wow shadow-xl z-50 fadeInUp ${theme === "dark" ? "dark:bg-gray-dark" : ""} relative rounded-sm bg-white p-8 sm:p-11 lg:p-8 xl:p-11`}
      data-wow-delay=".2s"
    >
      <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white">
        Subscribe to receive future updates
      </h3>
      <p className="mb-11 border-b border-body-color border-opacity-25 pb-11 text-base leading-relaxed text-black dark:border-white dark:border-opacity-25">
        Lorem ipsum dolor sited Sed ullam corper consectur adipiscing Mae ornare
        massa quis lectus.
      </p>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="border-stroke mb-4 w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-black outline-none focus:border-primary"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="border-stroke mb-4 w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-black outline-none focus:border-primary"
        />
        <input
          type="submit"
          value="Subscribe"
          className="shadow-submit mb-5 flex w-full cursor-pointer items-center justify-center rounded-sm bg-blue-600 px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
        />
        <p className="text-center text-base leading-relaxed text-black">
          No spam guaranteed, So please don’t send any spam mail.
        </p>
      </div>
      <div>
        <span className="absolute left-2 top-7">
          <svg
            width="57"
            height="65"
            viewBox="0 0 57 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M0.407629 15.9573L39.1541 64.0714L56.4489 0.160793L0.407629 15.9573Z"
              fill={`url(#paint0_linear_${theme === "light" ? "light" : "dark"})`}
            />
            <defs>
              <linearGradient
                id={`paint0_linear_${theme === "light" ? "light" : "dark"}`}
                x1="-18.3187"
                y1="55.1044"
                x2="37.161"
                y2="15.3509"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0.62"
                />
                <stop
                  offset="1"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
          </svg>
        </span>
        {/* The rest of your SVG elements and JSX code */}
      </div>
    </div>
  );
};

export default NewsLatterBox;
