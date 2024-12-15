"use client";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DynamicReactIcon from "../icons/strapi-icon";
import { usePlanContext } from "./plan-context";
import AccomodationSelection from "@/components/plan-page/accomodation-selection";
import BudgetSelection from "@/components/plan-page/budget-selection";
import CustomizeExperience from "@/components/plan-page/customize-experience";
import DateSelection from "@/components/plan-page/date-selection";
import DestinationSelection from "@/components/plan-page/destination-selction";
import PackageSelection from "@/components/plan-page/package-selection";
import ReviewFinal from "@/components/plan-page/review-final";
import Travel from "@/components/plan-page/travel";
import axios from "axios";

type PlanComponent = () => JSX.Element;

export const componentMapping: Record<string, PlanComponent> = {
  Travel: Travel,
  TravelDates: DateSelection,
  Destination: DestinationSelection,
  Package: PackageSelection,
  Accommodation: AccomodationSelection,
  Budget: BudgetSelection,
  Experience: CustomizeExperience,
  ReviewFinal: ReviewFinal,
};

export default function TestPlan() {
  const { selectedStep, setSelectedStep } = usePlanContext();
  const [steps, setSteps] = useState<any[]>([]);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/plan-with?populate=*",
        );
        setSteps(response?.data?.data?.attributes?.steps || []);
      } catch (error) {
        console.error("Error fetching steps:", error);
      }
    };

    fetchSteps();
  }, []);

  const currentStep =
    steps.find((step: any) => step?.step === selectedStep) || steps[0];
  const MatchedComponent = componentMapping[currentStep?.step];

  const handleStepChange = (direction: "next" | "prev") => {
    const currentIndex = steps.findIndex(
      (step: any) => step?.step === selectedStep,
    );
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < steps.length) {
      setSelectedStep(steps[newIndex].step);
    }
  };

  return (
    <section className="container relative flex flex-row space-x-6 lg:mt-32 lg:flex-col lg:space-x-0">
      {/* Left section with step icons */}
      <div className="lg:w-auto">
        <div className="sticky top-32 lg:static">
          <div className="relative mb-8 flex flex-col space-y-6 overflow-hidden lg:flex-row lg:justify-between lg:space-x-6 lg:space-y-0">
            {steps.map((step, index) => {
              const isCurrentStep = selectedStep === step?.step;
              const isCompletedStep =
                steps.findIndex((s) => s?.step === selectedStep) > index;

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
                  onClick={() => setSelectedStep(step?.step)}
                  aria-label={`Select ${step?.step} step`}
                >
                  <DynamicReactIcon name={step?.icon} />
                </div>
              );
            })}
            <hr className="absolute top-8 z-10 hidden w-full border border-dashed border-black lg:block" />
          </div>
        </div>
      </div>

      {/* Right section with description and current step content */}
      <div className="mt-4 grid grid-cols-1 gap-8 lg:mt-8 lg:grid-cols-3">
        <div className="order-2 rounded-lg bg-white p-3 shadow-lg shadow-gray-700 lg:order-1 lg:col-span-1 lg:min-h-96 lg:rounded-3xl lg:p-6 lg:shadow-2xl">
          <h3 className="mb-4 text-base font-semibold lg:text-xl">
            Description
          </h3>
          <p className="text-sm text-gray-700 lg:text-justify lg:text-base">
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
              disabled={selectedStep === steps[0]?.step}
            >
              <FaArrowLeft />
            </button>
            <button
              type="button"
              className="m-1 rounded-full p-3 text-primary transition duration-300 hover:bg-gray-100"
              onClick={() => handleStepChange("next")}
              aria-label="Next step"
              disabled={selectedStep === steps[steps.length - 1]?.step}
            >
              <FaArrowRight />
            </button>
          </div>
          <div className="text-center">
            <h2 className="mb-4 text-center text-base font-bold md:text-xl lg:text-2xl">
              {currentStep?.title}
            </h2>
            {MatchedComponent && <MatchedComponent />}
          </div>
        </div>
      </div>
    </section>
  );
}
