"use client";
import { stepsData } from "@/data/planSteps";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function PlanSteps() {
  const [selectedStep, setSelectedStep] = useState("Travel");

  const handleNextClick = () => {
    const currentIndex = stepsData.findIndex(
      (step) => step.step === selectedStep,
    );
    if (currentIndex < stepsData.length - 1) {
      setSelectedStep(stepsData[currentIndex + 1].step);
    }
  };

  const handlePrevClick = () => {
    const currentIndex = stepsData.findIndex(
      (step) => step.step === selectedStep,
    );
    if (currentIndex > 0) {
      setSelectedStep(stepsData[currentIndex - 1].step);
    }
  };

  const currentStep = stepsData.find((step) => step.step === selectedStep);

  return (
    <section className="container relative -mt-8 flex flex-row space-x-6 lg:flex-col lg:space-x-0">
      <div className="relative mb-8 flex w-96 flex-col space-y-6 overflow-hidden lg:w-auto lg:flex-row lg:justify-between lg:space-x-6 lg:space-y-0">
        {stepsData.map((step, index) => (
          <div
            key={index}
            className={`z-20 flex cursor-pointer items-center justify-center rounded-full p-1 text-lg lg:p-4 lg:text-[40px] ${
              selectedStep === step.step
                ? "bg-primary text-white"
                : "border border-black bg-white text-black lg:border-2"
            }`}
            onClick={() => setSelectedStep(step.step)}
          >
            {step.icons}
          </div>
        ))}
        <hr className="absolute top-8 z-10 hidden w-full border border-dashed border-black lg:block"></hr>
      </div>

      {/* Two-column layout: Description and Options */}
      <div className="mt-4 grid grid-cols-1 gap-8 lg:mt-8 lg:grid-cols-3">
        <div className="order-2 rounded-lg bg-white p-3 shadow-lg shadow-gray-700 lg:order-1 lg:col-span-1 lg:rounded-3xl lg:p-6 lg:shadow-2xl">
          <h3 className="mb-4 text-2xl font-semibold">Description</h3>
          <p className="text-justify text-sm text-gray-700 lg:text-base">
            {currentStep?.description}
          </p>
        </div>

        <div className="relative order-1 rounded-lg bg-white p-3 shadow-lg shadow-gray-700 lg:order-2 lg:col-span-2 lg:rounded-3xl lg:p-6 lg:shadow-2xl">
          <div className="absolute left-0 top-4 flex w-full justify-between">
            <button
              className="rounded-lg px-4 py-2 text-primary"
              onClick={handlePrevClick}
            >
              <FaArrowLeft />
            </button>
            <button
              className="px-4 py-2 text-primary"
              onClick={handleNextClick}
            >
              <FaArrowRight />
            </button>
          </div>
          <div className="text-center">{currentStep?.content}</div>
        </div>
      </div>
    </section>
  );
}
