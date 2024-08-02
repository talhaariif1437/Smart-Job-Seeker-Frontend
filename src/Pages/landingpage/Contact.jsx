import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const theme = "light"; 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post("http://localhost:7000/api/user/contactUs", formData);

      console.log("Form submitted successfully:", response.data);

      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className={`wow fadeInUp shadow-three w-full ${
        theme === "dark" ? "dark:bg-gray-dark" : ""
      } mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]`}
      data-wow-delay=".15s"
    >
      <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
        Need Help? Open a Ticket
      </h2>
      <p className="mb-12 text-base font-medium text-black">
        Our support team will get back to you ASAP via email.
      </p>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          <div className="w-full mb-8">
            <label
              htmlFor="name"
              className="mb-3 block text-sm font-medium text-black"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-black outline-none focus:border-primary"
            />
          </div>
          <div className="w-full mb-8">
            <label
              htmlFor="email"
              className="mb-3 block text-sm font-medium text-black"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-black outline-none focus:border-primary"
            />
          </div>
          <div className="w-full mb-8">
            <label
              htmlFor="message"
              className="mb-3 block text-black font-medium text-black"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your Message"
              className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-black text-balck outline-none focus:border-primary"
            ></textarea>
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="shadow-submit rounded-sm bg-blue-600 px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;
