"use client";
import { createContext, useState, useContext, ReactNode } from "react";
import { DateRange } from "react-day-picker";

type Budget = string | number | null | { min: number; max: number };

interface PlanContextType {
  travelDates: string;
  setTravelDates: (value: string) => void;
  destination: string;
  setDestination: (value: string) => void;
  packageType: string;
  setPackageType: (value: string) => void;
  accommodation: string;
  setAccommodation: (value: string) => void;
  budget: Budget;
  setBudget: (budget: Budget) => void;
  experience: string;
  setExperience: (value: string) => void;
  selectedTravelMode: string;
  setSelectedTravelMode: (value: string) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
  dateRange: DateRange | undefined;
  setDateRange: (value: DateRange | undefined) => void;

  //  budget-related states
  selectedBudgetOption: string;
  setSelectedBudgetOption: (value: string) => void;
  fixedAmount: number | "";
  setFixedAmount: (value: number | "") => void;
  minBudget: number;
  setMinBudget: (value: number) => void;
  maxBudget: number;
  setMaxBudget: (value: number) => void;

  // step-related states
  selectedStep: string;
  setSelectedStep: (value: string) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTravelMode, setSelectedTravelMode] = useState<string>("Solo");
  const [travelDates, setTravelDates] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [packageType, setPackageType] = useState<string>("");
  const [accommodation, setAccommodation] = useState<string>("");
  const [budget, setBudget] = useState<Budget>(null);
  const [experience, setExperience] = useState<string>("");

  // Date selection related state
  const [selectedOption, setSelectedOption] = useState<string>("Exact date");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  // Budget-related states
  const [selectedBudgetOption, setSelectedBudgetOption] = useState<string>("");
  const [fixedAmount, setFixedAmount] = useState<number | "">("");
  const [minBudget, setMinBudget] = useState<number>(200);
  const [maxBudget, setMaxBudget] = useState<number>(15000);

  // Step-related states
  const [selectedStep, setSelectedStep] = useState<string>("Travel");

  return (
    <PlanContext.Provider
      value={{
        travelDates,
        setTravelDates,
        destination,
        setDestination,
        packageType,
        setPackageType,
        accommodation,
        setAccommodation,
        budget,
        setBudget,
        experience,
        setExperience,
        selectedTravelMode,
        setSelectedTravelMode,
        selectedOption,
        setSelectedOption,
        date,
        setDate,
        dateRange,
        setDateRange,

        // Budget-related values
        selectedBudgetOption,
        setSelectedBudgetOption,
        fixedAmount,
        setFixedAmount,
        minBudget,
        setMinBudget,
        maxBudget,
        setMaxBudget,

        // Step-related values
        selectedStep,
        setSelectedStep,
      }}
    >
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
