import { usePlanContext } from "@/components/plan-page/plan-context";
import { useState } from "react";
import DynamicReactIcon from "../icons/strapi-icon";
import { staticSteps } from "./TestPlan";

export default function MakeAdjustments() {
  const [activeButton, setActiveButton] = useState<string>("");
  const { setSelectedStep } = usePlanContext();

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    setSelectedStep(button);
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 lg:gap-8">
        {staticSteps?.slice(0, -1).map((step, index) => (
          <button
            key={index}
            className={`acitve:scale-95 relative rounded-full border-2 border-primary p-4 text-xs font-medium text-primary shadow-gray-400 transition-all duration-300 hover:border-transparent hover:bg-primary hover:text-white focus:outline-none md:text-sm lg:text-base`}
            onClick={() => handleButtonClick(step?.step)}
          >
            {/* Render icon instead of text */}
            <DynamicReactIcon name={step?.icon} className="text-4xl" />
            <span
              className={`absolute inset-0 transform rounded-lg transition-transform duration-300 ${
                activeButton === step?.step ? "scale-105" : "scale-100"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
