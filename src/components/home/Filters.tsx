import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaCarAlt,
  FaChevronDown,
  FaHiking,
  FaMountain,
  FaSkiingNordic,
} from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa6";
import { GiHiking, GiStairsGoal } from "react-icons/gi";
import { MdHiking } from "react-icons/md";
import { toast } from "sonner";

const AdventureTypes = [
  { name: "Expedition", icon: <FaMountain size={32} /> },
  { name: "Trekking", icon: <FaHiking size={32} /> },
  { name: "Climbing", icon: <FaSkiingNordic size={32} /> },
  { name: "Driving", icon: <FaCarAlt size={32} /> },
];

const experiences = [
  {
    name: "Beginner",
    icon: <GiStairsGoal />,
    value: "beginner",
  },
  {
    name: "Intermediate",
    icon: <MdHiking />,
    value: "intermediate",
  },
  {
    name: "Advanced",
    icon: <GiHiking />,
    value: "advanced",
  },
];

const levels = [
  {
    title: "Level 1",
    description:
      "This level is suitable for individuals with little or no prior experience in adventure activities. Expect well-marked trails and guided tours.",
  },
  {
    title: "Level 2",
    description:
      "Designed for those with some experience in adventure activities. Includes moderate physical challenges and exploration of less familiar terrain.",
  },
  {
    title: "Level 3",
    description:
      "Perfect for seasoned adventurers seeking thrilling experiences. Expect rigorous physical activities, high altitudes, and demanding conditions.",
  },
];

const heights = [
  {
    name: "8000 M+",
  },
  {
    name: "7000 M+",
  },
  {
    name: "under 2000m",
  },
];

export default function FilterBox() {
  const [countries, setCountries] = useState<any>();
  const [regions, setRegions] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState<number | null>(0);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedAdventureType, setSelectedAdventureType] = useState<
    string | null
  >(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null,
  );
  const [selectedHeight, setSelectedHeight] = useState<string | null>(null);

  const toggleLevel = (index: number) => {
    setLevel(level === index ? null : index);
  };

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-regions?populate=*`,
        );
        setRegions(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching regions:", error);
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-countries?populate=*`,
        );
        setCountries(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching regions:", error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleApplyFilters = () => {
    const selectedLevelName =
      level !== null ? levels[level]?.title : "Not selected";
    const filtersMessage = `
      Country: ${selectedCountry || "Not selected"}
      Adventure Type: ${selectedAdventureType || "Not selected"}
      Experience Level: ${selectedExperience || "Not selected"}
      Height: ${selectedHeight || "Not selected"}
      Level: ${selectedLevelName || "Not selected"}
    `;

    alert(filtersMessage);

    toast.success("Filters applied successfully!", {
      description: "Applied Filters",
      duration: 1000,
    });
  };

  return (
    <DialogContent className="h-[90vh] overflow-auto sm:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>Filters</DialogTitle>
      </DialogHeader>

      {/* Choosing Country (Regions) */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Choose by Region</h2>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 md:mt-8 md:grid-cols-3">
          {regions?.map((region: any, index: number) => (
            <div key={index} className="cursor-pointer">
              <h3 className="text-lg font-bold uppercase md:text-2xl">
                {region?.attributes?.name}
              </h3>
              <ul className="mt-2">
                <li
                  onClick={() =>
                    setSelectedCountry(
                      region?.attributes?.package_country?.data?.attributes
                        ?.name,
                    )
                  }
                  className={`cursor-pointer px-4 py-1 ${selectedCountry === region?.attributes?.package_country?.data?.attributes?.name ? "rounded-lg border border-primary" : ""}`}
                >
                  {region?.attributes?.package_country?.data?.attributes?.name}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* choose Adventure Type */}
      <div className="mt-4 md:mt-8">
        <h2 className="text-xl font-semibold md:text-2xl">Adventure Type</h2>
        <div className="mt-4 flex flex-wrap gap-6">
          {AdventureTypes.map((adventure) => (
            <div
              key={adventure.name}
              onClick={() => setSelectedAdventureType(adventure.name)}
              className={`flex cursor-pointer flex-col items-center gap-2 rounded-md border p-3 shadow-lg hover:shadow-xl ${selectedAdventureType === adventure.name ? "border-primary" : ""}`}
            >
              {adventure.icon}
              <span className="border-t border-primary pt-1 text-sm font-medium">
                {adventure.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* choose Experience level */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold md:text-2xl">Experience</h2>
        <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-3">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="flex w-full cursor-pointer items-center space-x-2"
              onClick={() => setSelectedExperience(exp.value)}
            >
              <div
                className={`rounded-full border-[1px] p-2 ${selectedExperience === exp.value ? "border-primary" : "border-black"}`}
              >
                {exp?.icon}
              </div>
              <div
                className={`flex w-full justify-center rounded-lg border p-2 uppercase shadow ${selectedExperience === exp.value ? "border-primary" : "border-black"}`}
              >
                {exp?.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* choose by level */}
      <div className="mt-4 md:mt-8">
        <h2 className="text-xl font-semibold md:text-2xl">Choose By Level</h2>
        <div className="mt-4 space-y-4">
          {levels?.map((lvl, index) => (
            <div key={index} className="overflow-hidden">
              <button
                className={`flex w-[80%] cursor-pointer items-center justify-between rounded-es-xl rounded-se-xl px-4 py-2 text-left font-semibold text-white focus:outline-none ${level === index ? "bg-primary" : "bg-gray-800"}`}
                onClick={() => toggleLevel(index)}
              >
                <span className="text-sm md:text-base">{lvl?.title}</span>
                <span>
                  {level === index ? (
                    <FaChevronUp size={12} />
                  ) : (
                    <FaChevronDown size={12} />
                  )}
                </span>
              </button>
              <div
                className={`w-[80%] transition-all duration-500 ease-in-out ${
                  level === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="bg-white p-2 text-gray-700">
                  <p className="text-xs md:text-sm">{lvl?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* choose by height */}
      <div className="mt-4 md:mt-8">
        <h2 className="text-xl font-semibold md:text-2xl">Choose By Height</h2>
        <div className="mt-4 space-y-4">
          {heights?.map((ht, index) => (
            <div
              key={index}
              onClick={() => setSelectedHeight(ht?.name)}
              className={`max-w-[12rem] cursor-pointer rounded px-4 py-2 text-center text-xs text-white md:text-sm ${selectedHeight === ht?.name ? "bg-primary" : "bg-gray-900"}`}
            >
              {ht?.name}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <DialogFooter>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
      </DialogFooter>
    </DialogContent>
  );
}
