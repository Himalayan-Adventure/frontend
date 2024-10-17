import { stepsData } from "@/data/planSteps";
import { useState } from "react";
import { usePlanContext } from "./plan-context";

export default function MakeAdjustments() {
  const [activeButton, setActiveButton] = useState<string>("");
  const { setSelectedStep } = usePlanContext();

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    setSelectedStep(button);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 lg:gap-8">
        {stepsData?.slice(0, -1).map((step, index) => (
          <button
            key={index}
            className={`acitve:scale-95 relative rounded-lg border border-gray-400 bg-gray-100 px-4 py-3 text-xs font-medium text-black shadow-lg shadow-gray-400 transition-all duration-300 hover:border-transparent hover:bg-primary hover:text-white focus:outline-none md:text-sm lg:text-base`}
            onClick={() => handleButtonClick(step?.step)}
          >
            {step?.step}
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
