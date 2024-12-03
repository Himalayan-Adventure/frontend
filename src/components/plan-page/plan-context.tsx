"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { DateRange } from "react-day-picker";

interface Budget {
  // id: number;
  fixed_budget: string | null;
  budget_range_start: string | null;
  budget_range_end: string | null;
  decide_later: boolean;
}

interface TravelDates {
  // id: number;
  exact_date_start: string | null;
  exact_date_end: string | null;
  flexible_date_start: string | null;
  flexible_date_end: string | null;
  decide_later: boolean;
}

interface PlanContextType {
  group: string;
  setGroup: (group: string) => void;
  grade: string;
  setGrade: (grade: string) => void;
  destination: string;
  setDestination: (value: string) => void;
  accommodation: string[];
  setAccommodation: (preferences: string[]) => void;
  experience: string[];
  setExperience: (experiences: string[]) => void;

  // travel date-related states
  travelDates: TravelDates;
  setTravelDates: (dates: TravelDates) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
  dateRange: DateRange | undefined;
  setDateRange: (value: DateRange | undefined) => void;

  // Budget-related states
  selectedBudgetOption: string;
  setSelectedBudgetOption: (option: string) => void;
  fixedAmount: number | null;
  setFixedAmount: (amount: number | null) => void;
  minBudget: number | null;
  setMinBudget: (min: number | null) => void;
  maxBudget: number | null;
  setMaxBudget: (max: number | null) => void;
  setBudget: (budget: Budget) => void;
  budget: Budget | null;

  // Step-related states
  selectedStep: string;
  setSelectedStep: (value: string) => void;
}

// Create the context
const PlanContext = createContext<PlanContextType | undefined>(undefined);

// Context provider component
export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [group, setGroup] = useState<string>("solo");
  const [grade, setGrade] = useState<string>("beginner");
  const [destination, setDestination] = useState<string>("");
  const [accommodation, setAccommodation] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);

  // traveldate-related states
  const [travelDates, setTravelDates] = useState<TravelDates>({
    // id: 1,
    exact_date_start: null,
    exact_date_end: null,
    flexible_date_start: null,
    flexible_date_end: null,
    decide_later: false,
  });
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  // Budget-related states
  const [selectedBudgetOption, setSelectedBudgetOption] = useState<string>("");
  const [fixedAmount, setFixedAmount] = useState<number | null>(null);
  const [minBudget, setMinBudget] = useState<number | null>(null);
  const [maxBudget, setMaxBudget] = useState<number | null>(null);
  const [budget, setBudget] = useState<Budget>({
    // id: 1,
    fixed_budget: null,
    budget_range_start: null,
    budget_range_end: null,
    decide_later: false,
  });

  // Grade and step-related states
  const [selectedStep, setSelectedStep] = useState<string>("Travel");

  return (
    <PlanContext.Provider
      value={{
        travelDates,
        setTravelDates,
        destination,
        setDestination,
        accommodation,
        setAccommodation,
        experience,
        setExperience,
        selectedOption,
        setSelectedOption,
        date,
        setDate,
        dateRange,
        setDateRange,
        group,
        setGroup,
        selectedBudgetOption,
        setSelectedBudgetOption,
        fixedAmount,
        setFixedAmount,
        minBudget,
        setMinBudget,
        maxBudget,
        setMaxBudget,
        budget,
        setBudget,
        grade,
        setGrade,
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
