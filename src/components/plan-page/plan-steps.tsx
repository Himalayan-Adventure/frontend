"use client";
import { stepsData } from "@/data/planSteps";
import { useState, useMemo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { usePlanContext } from "./plan-context";

export default function PlanSteps() {
  const { selectedStep, setSelectedStep } = usePlanContext();

  const handleStepChange = (direction: "next" | "prev") => {
    const currentIndex = stepsData.findIndex(
      (step) => step.step === selectedStep,
    );
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < stepsData.length) {
      setSelectedStep(stepsData[newIndex].step);
    }
  };

  const currentStep = useMemo(() => {
    const currentIndex = stepsData.findIndex(
      (step) => step.step === selectedStep,
    );
    const step = stepsData[currentIndex] || stepsData[0];
    return {
      ...step,
      isFirstStep: currentIndex === 0,
      isLastStep: currentIndex === stepsData.length - 1,
    };
  }, [selectedStep]);

  return (
    <section className="container relative -mt-8 flex flex-row space-x-6 lg:flex-col lg:space-x-0">
      <div className=" lg:w-auto">
        <div className="sticky top-32 lg:static">
          <div className="relative mb-8 flex flex-col space-y-6 overflow-hidden lg:flex-row lg:justify-between lg:space-x-6 lg:space-y-0">
            {stepsData.map((step, index) => {
              const isCurrentStep = selectedStep === step.step;
              const isCompletedStep =
                stepsData.findIndex((s) => s.step === selectedStep) > index;

              return (
                <div
                  key={index}
                  className={`z-20 flex items-center justify-center rounded-full p-1 text-lg lg:p-4 lg:text-[40px] ${
                    isCurrentStep
                      ? "bg-primary text-white"
                      : isCompletedStep
                        ? "border border-primary bg-white text-primary"
                        : "border border-black bg-white text-black lg:border-2"
                  } transition duration-300`}
                  // onClick={() => setSelectedStep(step.step)}
                  aria-label={`Select ${step.step} step`}
                >
                  {step.icons}
                </div>
              );
            })}
            <hr className="absolute top-8 z-10 hidden w-full border border-dashed border-black lg:block"></hr>
          </div>
        </div>
      </div>

      {/* Two-column layout: Description and Options */}
      <div className="mt-4 grid grid-cols-1 gap-8 lg:mt-8 lg:grid-cols-3">
        <div className="order-2 lg:min-h-96 rounded-lg bg-white p-3 shadow-lg shadow-gray-700 lg:order-1 lg:col-span-1 lg:rounded-3xl lg:p-6 lg:shadow-2xl">
          <h3 className="mb-4 text-base lg:text-xl font-semibold">Description</h3>
          <p className="lg:text-justify text-sm text-gray-700 lg:text-base">
            {currentStep?.description}
          </p>
        </div>

        <div className="relative order-1 rounded-lg bg-white p-3 shadow-lg shadow-gray-700 lg:order-2 lg:col-span-2 lg:rounded-3xl lg:p-6 lg:shadow-2xl">
          <div className="absolute left-0 top-4 flex w-full justify-between">
            <button
              type="button"
              className="m-1 rounded-full p-3 text-primary transition duration-300 hover:bg-gray-100"
              onClick={() => handleStepChange("prev")}
              aria-label="Previous step"
              disabled={currentStep.isFirstStep}
            >
              <FaArrowLeft />
            </button>
            <button
              type="button"
              className="m-1 rounded-full p-3 text-primary transition duration-300 hover:bg-gray-100"
              onClick={() => handleStepChange("next")}
              aria-label="Next step"
              disabled={currentStep.isLastStep}
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
