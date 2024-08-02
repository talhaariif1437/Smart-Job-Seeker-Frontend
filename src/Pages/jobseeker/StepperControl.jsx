export default function StepperControl({ handleClick, currentStep, steps }) {
  return (
    <div className={"container mb-8 flex justify-between px-5"}>
      <button
        onClick={() => handleClick("back")}
        className={`cursor-pointer rounded-xl border-2 border-gray-500 bg-green-500 py-2 px-4 ms-3 font-semibold uppercase transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white  ${
          currentStep === 1
            ? " pointer-events-none opacity-50 border-1 hover:none"
            : ""
        }`}
      >
        Back
      </button>
      {currentStep <= steps.length && (
        <button
          onClick={() => handleClick("next")}
          className="cursor-pointer rounded-lg bg-green-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
        >
          {currentStep === steps.length ? "Confirm" : "Save & Next"}
        </button>
      )}
    </div>
  );
}
