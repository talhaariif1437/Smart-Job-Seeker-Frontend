import React from "react";
import SectionTitle from "./SectionTitle";
import image from "./Qadir.jpg";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const List = ({ text }) => (
  <p className="mb-5 flex items-center text-lg font-medium text-body-color">
    <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
      {checkIcon}
    </span>
    {text}
  </p>
);

const AboutSectionOne = () => {
  return (
    <section id="about" className="pt-16 bg-white md:pt-20 lg:pt-28 px-20 ">
      <div className="container mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
        <div className="border-b border-body-color/[.15] pb-16  md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2 text-gray-500">
              <SectionTitle
                title="HAFIZ MUHAMMAD QADIR"
                paragraph="Hafiz Muhammad Qadir, a Lecturer at Lahore Garrison University, focuses on deep learning and Data Science, with numerous influential papers and extensive collaborations in healthcare and biotec."
                mb="44px"
              />

              <div className="wow  fadeInUp mb-12 max-w-[570px] lg:mb-0" data-wow-delay=".15s ">
                <div className="mx-[5px]  flex flex-wrap ">
                  <div className="w-full px-3  sm:w-1/2 lg:w-full xl:w-1/2">
                  <List text="Deep Learning" />
                    
                    <List text="Machine Learning" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Data Science" />
                    <List text="Rich Documentation" />
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="wow  fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] max-h-[500px] lg:mr-0" data-wow-delay=".2s">
                <img
                  src={image}
                  alt="about-image"
                  className="drop-shadow-three mx-auto w-full h-full rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
