"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface PlanData {
  travel: string;
  travelDates: string;
  destination: string;
  package: string;
  accommodation: string;
  budget: string;
  experience: string;
}

interface StepStates {
  selectedTravelMode: string;
  setSelectedTravelMode: string;
}

interface PlanContextType {
  planData: PlanData;
  updatePlanData: (step: keyof PlanData, data: string) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTravelMode, setSelectedTravelMode] = useState<string | null>(
    "Solo",
  );

  const [planData, setPlanData] = useState<PlanData>({
    travel: "",
    travelDates: "",
    destination: "",
    package: "",
    accommodation: "",
    budget: "",
    experience: "",
  });

  console.log("plans data", planData);

  const updatePlanData = (step: keyof PlanData, data: string) => {
    setPlanData((prevData) => ({
      ...prevData,
      [step]: data,
    }));
  };

  return (
    <PlanContext.Provider value={{ planData, updatePlanData }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = (): PlanContextType => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlanContext must be used within a PlanProvider");
  }
  return context;
};
