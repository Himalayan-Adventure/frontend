"use client";
import { useState } from "react";
import { usePlanContext } from "./plan-context";
import axios from "axios";
import { toast } from "sonner";

export default function YourDetailsForm() {
  const { group, budget, travelDates, experience, accommodation, grade } =
    usePlanContext();

  const [detailsFormData, setDetailsFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDetailsFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (
      !detailsFormData.name.trim() ||
      !detailsFormData.email.trim() ||
      !detailsFormData.message.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(detailsFormData.email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    const payload = {
      data: {
        group: group,
        grade: grade,
        accommodation_preferences: accommodation.join(", "),
        customized_experience: experience.join(", "),
        travel_dates: travelDates,
        budget: budget,
        finalize: {
          name: detailsFormData.name,
          email: detailsFormData.email,
          message: detailsFormData.message,
        },
      },
    };

    setLoading(true);
    setError("");

    try {
      const token = process.env.NEXT_PUBLIC_API_TOKEN;
      const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

      const response = await axios.post(
        `${apiUrl}api/plan-with-uses`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Form submitted successfully!");
      setDetailsFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response);
        toast.error(
          error.response?.data?.message || "Failed to submit the form.",
        );
      } else {
        console.error("Unexpected error:", error);
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
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
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => handleSubmit()}
          disabled={loading}
          className={`rounded-lg bg-primary px-4 py-2 text-sm text-white shadow-lg shadow-gray-500 transition-colors duration-300 hover:bg-opacity-80 md:text-base ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {loading ? "Submitting..." : "Get Quotes"}
        </button>
        <button
          onClick={() => handleSubmit()}
          disabled={loading}
          className={`rounded-lg bg-primary px-4 py-2 text-sm text-white shadow-lg shadow-gray-500 transition-colors duration-300 hover:bg-opacity-80 md:text-base ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {loading ? "Submitting..." : "Optimize Package"}
        </button>
      </div>
    </div>
  );
}
