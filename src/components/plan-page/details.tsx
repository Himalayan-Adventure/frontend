import { usePlanContext } from "./plan-context";

export default function Details({ setSelectedOption }: any) {
  const {
    selectedTravelMode,
    budget,
    travelDates,
    experience,
    destination,
    accommodation,
    packageType,
    selectedBudgetOption,
    fixedAmount,
    minBudget,
    maxBudget,
  } = usePlanContext();

  const handleConfirmClick = () => {
    setSelectedOption("Your Details");
  };

  return (
    <div className="grid gap-6 text-left md:grid-cols-2 md:gap-8">
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold md:text-base">Travel Mode:</h2>
        <p className="text-gray-700 text-sm md:text-base">{selectedTravelMode}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold md:text-base">Budget:</h2>
        <div>
          {/* Other details */}
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
        <p className="text-gray-700 text-sm md:text-base">{travelDates}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold md:text-base">
          Custom Preferences:
        </h2>
        <p className="text-gray-700 text-sm md:text-base">{experience}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold md:text-base">Destination:</h2>
        <p className="text-gray-700 text-sm md:text-base">{destination}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold md:text-base">Accommodation:</h2>
        <p className="text-gray-700 text-sm md:text-base">{accommodation}</p>
      </div>
      {/* <div className="flex flex-col">
          <h2 className="font-semibold text-sm md:text-base">Package:</h2>
          <p className="text-gray-700 text-sm md:text-base">{packageType}</p>
        </div> */}

      {/* Add the "Check & Confirm" button */}
      <div className="flex justify-center md:col-span-2">
        <button
          onClick={handleConfirmClick}
          className="active:sclae-95 mt-4 rounded-2xl border border-black px-4 py-2 text-sm font-bold transition-all duration-300 hover:bg-slate-100 hover:bg-opacity-80 md:text-base lg:px-8"
        >
          Check & Confirm
        </button>
      </div>
    </div>
  );
}
