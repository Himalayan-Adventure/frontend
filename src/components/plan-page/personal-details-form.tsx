import { useState } from "react";
import { usePlanContext } from "./plan-context";

export default function YourDetailsForm() {
  const {
    selectedTravelMode,
    budget,
    travelDates,
    experience,
    destination,
    accommodation,
    // packageType,
  } = usePlanContext();

  const [detailsFormData, setDetailsFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDetailsFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (action: string) => {
    const combinedData = {
      ...detailsFormData,
      selectedTravelMode,
      budget,
      travelDates,
      experience,
      destination,
      accommodation,
      // packageType,
    };
    console.log(`${action} clicked`, combinedData);
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={detailsFormData.name}
        onChange={handleChange}
        className="rounded-lg border border-gray-100 bg-gray-200 p-2 px-3 pt-4 text-sm text-black placeholder-gray-700 shadow-inner shadow-gray-400 outline-none md:px-6 md:text-base"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={detailsFormData.email}
        onChange={handleChange}
        className="rounded-lg border border-gray-100 bg-gray-200 p-2 px-3 pt-4 text-sm text-black placeholder-gray-700 shadow-inner shadow-gray-400 outline-none md:px-6 md:text-base"
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        value={detailsFormData.message}
        onChange={handleChange}
        className="resize-none rounded-lg border border-gray-100 bg-gray-200 p-2 px-3 pt-4 text-sm text-black placeholder-gray-700 shadow-inner shadow-gray-400 outline-none md:px-6 md:text-base"
        rows={6}
        required
      />
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => handleSubmit("Get Quotes")}
          className="rounded-lg bg-primary px-4 py-2 text-sm text-white shadow-lg shadow-gray-500 transition-colors duration-300 hover:bg-opacity-80 md:text-base"
        >
          Get Quotes
        </button>
        <button
          onClick={() => handleSubmit("Optimize Package")}
          className="rounded-lg bg-primary px-4 py-2 text-sm text-white shadow-lg shadow-gray-500 transition-colors duration-300 hover:bg-opacity-80 md:text-base"
        >
          Optimize Package
        </button>
      </div>
    </div>
  );
}
