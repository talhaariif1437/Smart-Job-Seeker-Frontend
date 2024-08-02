import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
// import interest from "../../../data_arrays/interest.json";

const Interests = ({ handleNextStep }) => {
  const [searchInterest, setSearchInterest] = useState("");
  const [interests, setInterests] = useState(interest);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [validate, setValidate] = useState({
    interests: [],
  });
  const [error, setError] = useState({ interests: "" });

  const validateForm = () => {
    if (selectedInterests.length === 0) {
      setError((error) => ({
        ...error,
        interests: "Please select at least one interest",
      }));
      return false;
    } else {
      setError((error) => ({ ...error, interests: "" }));
      return true;
    }
  };

  const handlePost = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Validation is successful");
      handleNextStep(); // Call the function to go to the next step
    } else {
      console.log("Validation failed");
    }
  };

  const handleInterestSearch = () => {
    const searchedInterests = interest.filter((interest) =>
      interest.toLowerCase().includes(searchInterest.toLowerCase())
    );

    setInterests((currentInterests) => [
      ...searchedInterests,
      ...currentInterests.filter(
        (interest) =>
          !searchedInterests.some(
            (searchedInterest) => searchedInterest === interest
          )
      ),
    ]);
    setSearchInterest("");
  };

  const handleInterestSelect = (interest) => {
    setSelectedInterests([...selectedInterests, interest]);
    setInterests(interests.filter((i) => interest !== i));
  };

  const handleInterestRemove = (interest) => {
    const newInterests = selectedInterests.filter((i) => interest !== i);
    setSelectedInterests(newInterests);
    setInterests([...interests, interest]);
  };

  const navigate = useNavigate();

  useEffect(() => {
    setValidate({ ...validate, interests: [] });
  }, []);

  return (
    <div className="skills-container">
      <div className="ml-6">
        {validate.interests.length !== 0 ? (
          <div className="pt-2 pb-2 mb-4">
            <div className="flex flex-wrap border-b pb-8 gap-3">
              {selectedInterests.map((interest) => (
                <div
                  key={interest}
                  className="skill border-1 rounded-md px-2 gap-1 text-s font-medium text-blue-900 ring-1 ring-inset ring-blue-700/10"
                >
                  <p
                    className="mt-3"
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    {interest}
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const newInterests = selectedInterests.filter(
                        (i) => interest !== i
                      );
                      setSelectedInterests(newInterests);
                      setValidate((validate) => {
                        return {
                          ...validate,
                          interests: newInterests,
                        };
                      });
                      setInterests([...interests, interest]);
                    }}
                    className="ms-2 ps-1 border-s border-gray-900"
                  >
                    <XMarkIcon width={20} height={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="pt-2 pb-2">
          <div className="flex mb-8">
            <div className="w-full flex justify-content-between">
              <input
                type="text"
                value={searchInterest}
                onChange={(e) => setSearchInterest(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 pl-10"
                placeholder="Search Interests..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 mt-2.5 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <MagnifyingGlassIcon />
              </svg>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleInterestSearch();
              }}
              className="bg-indigo-500 text-white px-3 py-2 rounded-md ml-4"
              style={{ backgroundColor: "#112A46" }}
            >
              Search
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <div
                key={interest}
                className="skill border-1 rounded-md px-2 gap-1 text-s font-medium text-blue-900 ring-1 ring-inset ring-blue-700/10"
              >
                <p
                  className="mt-3"
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  {interest}
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const remainingInterests = interests.filter(
                      (i) => interest !== i
                    );

                    setSelectedInterests([...selectedInterests, interest]);
                    setValidate((validate) => {
                      return {
                        ...validate,
                        interests: [...validate.interests, interest],
                      };
                    });
                    setInterests(remainingInterests);
                  }}
                  className="ms-2 ps-1 border-s border-gray-900"
                >
                  <PlusIcon width={20} height={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handlePost}
          style={{ backgroundColor: "#112A46" }}
          className="rounded-md mb-2 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Interests;
