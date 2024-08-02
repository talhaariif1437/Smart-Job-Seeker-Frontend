import React from "react";
import NewsLatterBox from "./NewsLatterBox";
import Contact from "./Contact";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer/Footer";
import AboutSectionOne from "./About/AboutSectionOne";
import AboutSectionTwo from "./About/AboutSectionTwo";
import TimeExchangePerson from "./TimeExchangePerson/TimeExchangePerson";
import Companies from "./Companyhireing/Companies";
import Carousel from './Carousel/Carousel';
// import { Carousel } from "bootstrap";

export default function LandingPage() {
  return (
    <div className="bg-white  bg-opacity-90 ">
      <Header />

      <Hero />
      <div >
        <Carousel/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
        <Companies />
        <TimeExchangePerson />
      </div>
      <div className="  mt-2">
        <AboutSectionOne />
        <AboutSectionTwo />
      </div>

      <div className="flex flex-wrap my-2 justify-center ">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
