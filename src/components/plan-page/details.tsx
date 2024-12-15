import { usePlanContext } from "@/components/plan-page/plan-context";

// Define the TravelDates type if it's not already defined
type TravelDates = {
  exact_date_start: string;
  exact_date_end: string;
  flexible_date_start: string;
  flexible_date_end: string;
};

interface DetailsProps {
  setSelectedOption: (option: string) => void;
}

export default function Details({ setSelectedOption }: DetailsProps) {
  const {
    group,
    budget,
    travelDates,
    experience,
    destination,
    accommodation,
    selectedBudgetOption,
    fixedAmount,
    minBudget,
    maxBudget,
    selectedPackageNames,
  } = usePlanContext();

  const handleConfirmClick = () => {
    setSelectedOption("Your Details");
  };

  const renderTravelDates = () => {
    const dates = travelDates as TravelDates;
    console.log("Current travel dates:", dates);

    if (dates.exact_date_start && dates.exact_date_end) {
      return `${dates.exact_date_start} - ${dates.exact_date_end}`;
    }

    if (dates.flexible_date_start && dates.flexible_date_end) {
      return `${dates.flexible_date_start} - ${dates.flexible_date_end} (Flexible)`;
    }

    return "No travel dates specified.";
  };

  const renderPackages = () => {
    if (selectedPackageNames.length > 0) {
      return selectedPackageNames.join(", ");
    }
    return "No packages selected.";
  };

  console.log("test", budget);
  console.log("datteee", travelDates);

  return (
    <div className="grid gap-6 text-left capitalize md:grid-cols-2 md:gap-8">
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold md:text-base">Travel Mode:</h2>
        <p className="text-sm text-gray-700 md:text-base">{group}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold md:text-base">Budget:</h2>
        <div>
          {selectedBudgetOption === "Fixed Budget" && (
            <p>Fixed Budget: ${fixedAmount}</p>
          )}
          {selectedBudgetOption === "Set your Budget Range" && (
            <p>
              Budget Range: ${minBudget} - ${maxBudget}
            </p>
          )}
          {selectedBudgetOption === "I'll decide later" && (
            <p>You can decide your budget later.</p>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold md:text-base">Departure:</h2>
        <p className="text-sm text-gray-700 md:text-base">
          {renderTravelDates()}
        </p>
      </div>
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold md:text-base">
          Custom Preferences:
        </h2>
        <p className="text-sm text-gray-700 md:text-base">
          {experience.length > 0
            ? experience.join(", ")
            : "No preferences specified."}
        </p>
      </div>
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold md:text-base">Destination:</h2>
        <p className="text-sm text-gray-700 md:text-base">{destination}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold md:text-base">Accommodation:</h2>
        <p className="text-sm text-gray-700 md:text-base">
          {accommodation.length > 0
            ? accommodation.join(", ")
            : "No accommodation specified."}
        </p>
      </div>
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold md:text-base">Packages :</h2>
        <p className="text-sm text-gray-700 md:text-base">{renderPackages()}</p>
      </div>

      {/*  "Check & Confirm" button */}
      <div className="flex justify-center md:col-span-2">
        <button
          onClick={handleConfirmClick}
          className="mt-4 rounded-2xl border border-black px-4 py-2 text-sm font-bold transition-all duration-300 hover:bg-slate-100 hover:bg-opacity-80 active:scale-95 md:text-base lg:px-8"
        >
          Check & Confirm
        </button>
      </div>
    </div>
  );
}
