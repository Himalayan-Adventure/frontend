"use client";
import { createContext, useState, useContext, ReactNode } from "react";
import { DateRange } from "react-day-picker";

interface Budget {
  fixed_budget: string | null;
  budget_range_start: string | null;
  budget_range_end: string | null;
  decide_later: boolean;
}

interface TravelDates {
  exact_date_start: string | null;
  exact_date_end: string | null;
  flexible_date_start: string | null;
  flexible_date_end: string | null;
  decide_later: boolean;
}

interface PlanContextType {
  group: string;
  setGroup: (group: string) => void;
  selectedDestinationId: number | undefined;
  setSelectedDestinationId: (id: number | undefined) => void;
  accommodation: string[];
  setAccommodation: (preferences: string[]) => void;
  experience: string[];
  setExperience: (experiences: string[]) => void;

  travelDates: TravelDates;
  setTravelDates: (dates: TravelDates) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
  dateRange: DateRange | undefined;
  setDateRange: (value: DateRange | undefined) => void;

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

  selectedStep: string;
  setSelectedStep: (value: string) => void;

  selectedPackageIds: string[];
  setSelectedPackageIds: React.Dispatch<React.SetStateAction<string[]>>;

  selectedPackageType: string[]; // Change from string to string[]
  setSelectedPackageType: React.Dispatch<React.SetStateAction<string[]>>;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [group, setGroup] = useState<string>("solo");
  const [selectedDestinationId, setSelectedDestinationId] = useState<number>();
  const [accommodation, setAccommodation] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);

  const [travelDates, setTravelDates] = useState<TravelDates>({
    exact_date_start: null,
    exact_date_end: null,
    flexible_date_start: null,
    flexible_date_end: null,
    decide_later: false,
  });
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const [selectedBudgetOption, setSelectedBudgetOption] = useState<string>("");
  const [fixedAmount, setFixedAmount] = useState<number | null>(null);
  const [minBudget, setMinBudget] = useState<number | null>(null);
  const [maxBudget, setMaxBudget] = useState<number | null>(null);
  const [budget, setBudget] = useState<Budget>({
    fixed_budget: null,
    budget_range_start: null,
    budget_range_end: null,
    decide_later: false,
  });

  const [selectedStep, setSelectedStep] = useState<string>("Travel");

  const [selectedPackageIds, setSelectedPackageIds] = useState<string[]>([]);

  const [selectedPackageType, setSelectedPackageType] = useState<string[]>([]);
  return (
    <PlanContext.Provider
      value={{
        travelDates,
        setTravelDates,
        selectedDestinationId,
        setSelectedDestinationId,
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
        selectedStep,
        setSelectedStep,
        selectedPackageIds,
        setSelectedPackageIds,
        selectedPackageType,
        setSelectedPackageType,
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
