import { usePlanContext } from "@/components/plan-page/plan-context";
import axios from "axios";
import { useEffect, useState } from "react";
import DynamicReactIcon from "../icons/strapi-icon";

export default function MakeAdjustments() {
  const [steps, setSteps] = useState<any[]>([]);
  const [activeButton, setActiveButton] = useState<string>("");
  const { setSelectedStep } = usePlanContext();

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

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    setSelectedStep(button);
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 lg:gap-8">
        {steps?.slice(0, -1).map((step, index) => (
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
