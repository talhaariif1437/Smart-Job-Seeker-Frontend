import React, { useEffect, useState, useRef } from "react";
const Stepper = ({ steps, currentStep, onStepClick, allFieldsFilled }) => {
  const [newStep, setNewStep] = useState([]);
  const stepsRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: allFieldsFilled(stepNumber),
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );

    stepsRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepsRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const stepsDisplay = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex items-center cursor-pointer"
            : "flex items-center cursor-pointer"
        }
        onClick={() => onStepClick(index + 1)}
      >
        <div className="relative flex flex-col items-center text-gray-500 font-sans">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-400 h-12 w-12 flex items-center justify-center py-3  ${
              step.selected
                ? "bg-green-600 text-white font-bold border border-green-600 "
                : ""
            }`}
          >
            {step.completed ? (
              <span className="text-white font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
          <div
            className={`absolute top-0  text-center mt-16 w-31 text-xs font-medium uppercase ${
              step.highlighted ? "text-gray-900" : " text-gray-500"
            }`}
          >
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out  ${
            step.completed ? "border-green-600" : "border-gray-400 "
          }  `}
        ></div>
      </div>
    );
  });

  return (
    <div className="mx-4 p-6 rounded-md  flex justify-between items-center"
    // style={{
    //   backgroundImage: `url(${bgImage})`,
    //   backgroundSize:'cover',
    //   backgroundPosition: "center",
    //   height:"30vh"
      
    // }}
    >
      {stepsDisplay}
    </div>
  );
};

export default Stepper;
