import { useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { FaRedo } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { usePlanContext } from "./plan-context";

const options = [
  {
    icon: <FaRedo />,
    name: "Make Adjustments",
    content: "Here you can make adjustments to your travel plans.",
  },
  {
    icon: <BsPatchCheckFill />,
    name: "Check Your Itinerary",
    content: <Details />,
  },
  {
    icon: <TbListDetails />,
    name: "Your Details",
    content: <YourDetailsForm />,
  },
];

export default function ReviewFinal() {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    "Check Your Itinerary",
  );

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const selectedContent = options.find(
    (option) => option.name === selectedOption,
  )?.content;

  return (
    <div className="">
      <h2 className="mb-4 text-center text-base font-bold md:text-xl lg:text-2xl">
        Review and Finalize
      </h2>
      <div className="grid gap-4 lg:grid-cols-6 lg:gap-8">
        {/* Tabs */}
        <div className="flex flex-col pr-4 lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            {options.map((option) => (
              <div
                key={option.name}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-2 shadow-lg transition-colors duration-300 ease-in-out md:p-4 ${
                  selectedOption === option.name
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleOptionClick(option.name)}
              >
                <span
                  className={`text-xl lg:text-4xl ${
                    selectedOption === option.name
                      ? "text-white"
                      : "text-primary"
                  }`}
                >
                  {option.icon}
                </span>
                <hr className="my-2 w-full border-gray-300" />
                <span className="text-sm md:text-base">{option.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex items-center justify-center lg:col-span-4">
          {selectedContent && (
            <div className="w-full">
              {typeof selectedContent === "string" ? (
                <p>{selectedContent}</p>
              ) : (
                selectedContent
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Details() {
  const { planData } = usePlanContext();

  return (
    <div className="grid gap-6 text-left md:grid-cols-2 md:gap-8">
      <div className="flex flex-col">
        <h2 className="font-semibold">Travel Mode:</h2>
        <p className="text-gray-700">{planData?.travel}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold">Budget:</h2>
        <p className="text-gray-700">{planData?.budget}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold">Departure:</h2>
        <p className="text-gray-700">{planData?.travelDates}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold">Custom Preferences:</h2>
        <p className="text-gray-700">{planData?.experience}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold">Destination:</h2>
        <p className="text-gray-700">{planData?.destination}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold">Accommodation:</h2>
        <p className="text-gray-700">{planData?.accommodation}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold">Package:</h2>
        <p className="text-gray-700">{planData?.package}</p>
      </div>
    </div>
  );
}

function YourDetailsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetQuotes = () => {
    console.log("Get Quotes clicked", formData);
  };

  const handleOptimizePackage = () => {
    console.log("Optimize Package clicked", formData);
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="rounded-lg border border-gray-100 bg-gray-200 p-2 px-3 pt-4 text-sm text-black placeholder-gray-700 shadow-inner shadow-gray-400 md:px-6 md:text-base"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="rounded-lg border border-gray-100 bg-gray-200 p-2 px-3 pt-4 text-sm text-black placeholder-gray-700 shadow-inner shadow-gray-400 md:px-6 md:text-base"
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        className="resize-none rounded-lg border border-gray-100 bg-gray-200 p-2 px-3 pt-4 text-sm text-black placeholder-gray-700 shadow-inner shadow-gray-400 md:px-6 md:text-base"
        rows={6}
        required
      />
      <div className="flex justify-center space-x-2">
        <button
          onClick={handleGetQuotes}
          className="rounded-lg bg-primary px-4 py-2 text-sm text-white shadow-lg shadow-gray-500 transition-colors duration-300 hover:bg-opacity-80 md:text-base"
        >
          Get Quotes
        </button>
        <button
          onClick={handleOptimizePackage}
          className="rounded-lg bg-primary px-4 py-2 text-sm text-white shadow-lg shadow-gray-500 transition-colors duration-300 hover:bg-opacity-80 md:text-base"
        >
          Optimize Package
        </button>
      </div>
    </div>
  );
}
