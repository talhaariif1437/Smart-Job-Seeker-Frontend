import React from 'react';
import image from "./talha.jpg";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 bg-white md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0 "
              data-wow-delay=".15s"
            >
              <img
                src={image}
                alt="about image"
                className="drop-shadow-three mx-auto w-full h-full rounded-full  "
              />
              <img
                src="/images/about/about-image-2-dark.svg"
                alt="about image"
                className="drop-shadow-three hidden  "
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px] px-7" data-wow-delay=".2s">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                 Talha Arif
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed justify ">
                Talha Arif is a proficient MERN Stack Developer with expertise in building dynamic and scalable web applications using MongoDB, Express.js, React, and Node.js. He excels in creating efficient backend systems and intuitive user interfaces, delivering high-quality software solutions.
                </p>
              </div>
              <div className="mb-9 ">
                <h3 className="mb-4 text-xl font-bold text-black  sm:text-2xl lg:text-xl xl:text-2xl">
                  MERN Stack Developer
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                MERN Stack Developer specializes in building full-stack web applications using MongoDB, Express.js, React, and Node.js. They create dynamic user interfaces, robust server-side logic, and efficient database management.
                </p>
              </div>
              {/* <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black  sm:text-2xl lg:text-xl xl:text-2xl">
                  Next.js
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed  sm:text-lg sm:leading-relaxed">
                  Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt
                  consectetur adipiscing elit setim.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
