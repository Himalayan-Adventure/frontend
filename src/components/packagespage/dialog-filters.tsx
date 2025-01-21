import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { APIResponseCollection } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaBolt,
  FaChevronDown,
  FaDumbbell,
  FaFire,
  FaLeaf,
  FaMountain,
  FaRegUser,
  FaSnowflake,
  FaSun,
} from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa6";
import { GiFlowerEmblem } from "react-icons/gi";
import DynamicReactIcon from "../icons/strapi-icon";

export default function FilterBox() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedAdventureType, setSelectedAdventureType] = useState<
    string | null
  >(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null,
  );
  const [selectedHeight, setSelectedHeight] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const { data: adventureTypes } = useQuery({
    queryKey: ["package-type"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-types`,
      );
      const data: APIResponseCollection<"api::package-type.package-type"> =
        await response.json();
      return data;
    },
    select: (data) => {
      return data.data.map((type) => ({
        name: type.attributes.name,
        icon: type.attributes.react_icon,
      }));
    },
  });

  const handleMonthClick = (seasonName: string, month: string) => {
    if (selectedSeason === seasonName && selectedMonth === month) {
      setSelectedMonth(null);
    } else {
      setSelectedSeason(seasonName);
      setSelectedMonth(month);
    }
  };

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
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-white text-primary hover:text-white">
            <SlidersHorizontal size={16} />
            <p>View filters</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[90vh] overflow-auto sm:max-w-[800px]">
          <p>Loading...</p>
        </DialogContent>
      </Dialog>
    );
  }

  const handleApplyFilters = () => {
    const selectedCountry = countries?.find((country: any) =>
      country?.attributes?.package_regions?.data?.some(
        (region: any) => region?.attributes?.name === selectedRegion,
      ),
    );

    const selectedCountryName = selectedCountry
      ? selectedCountry?.attributes?.name
      : "Not selected";

    const selectedLevelName = level !== null ? level : "Not selected";

    const queryParams = new URLSearchParams();

    if (selectedRegion) {
      queryParams.set("region", selectedRegion);
    }
    if (selectedAdventureType) {
      queryParams.set("adventureType", selectedAdventureType);
    }
    if (selectedExperience) {
      queryParams.set("experience", selectedExperience);
    }
    if (selectedHeight) {
      queryParams.set("height", selectedHeight);
    }
    if (selectedLevelName !== "Not selected") {
      queryParams.set("level", selectedLevelName);
    }
    if (selectedSeason) {
      queryParams.set("season", selectedSeason);
    }

    setIsOpen(false);
    router.push(`/packages?${queryParams.toString()}`);
  };

  const handleClearFilter = () => {
    setSelectedRegion("");
    setSelectedAdventureType("");
    setSelectedExperience("");
    setSelectedHeight("");
    setLevel(null);
    setSelectedSeason("");

    setIsOpen(false);
    router.push(`/packages`);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogTrigger asChild>
          <Button className="bg-white text-primary hover:text-white">
            <SlidersHorizontal size={16} />
            <p>View filters</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[90vh] overflow-auto sm:max-w-[800px]">
          <>
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
            </DialogHeader>
            {/* Choosing Country (Regions) */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold md:text-2xl">
                  Choose by Region
                </h2>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 md:mt-8 md:grid-cols-3">
                {countries?.map((country: any, index: number) => (
                  <div key={index} className="cursor-pointer">
                    <h3 className="text-lg font-bold uppercase md:text-xl">
                      {country?.attributes?.name}
                    </h3>
                    <ul className="mt-2">
                      {country?.attributes?.package_regions?.data?.map(
                        (region: any, index: number) => (
                          <li
                            key={index}
                            onClick={() =>
                              setSelectedRegion(
                                region?.attributes?.name === selectedRegion
                                  ? null
                                  : region?.attributes?.name,
                              )
                            }
                            className={`cursor-pointer px-2 py-1 ${selectedRegion === region?.attributes?.name ? "rounded-lg bg-primary text-white" : ""}`}
                          >
                            {region?.attributes?.name}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            {/* choose Adventure Type */}
            <div className="mt-4 md:mt-8">
              <h2 className="text-xl font-semibold md:text-2xl">
                Adventure Type
              </h2>
              <div className="mt-4 flex flex-wrap gap-6">
                {adventureTypes?.map((adventure) => (
                  <div
                    key={adventure.name}
                    onClick={() =>
                      setSelectedAdventureType(
                        adventure.name === selectedAdventureType
                          ? null
                          : adventure.name,
                      )
                    }
                    className={`flex cursor-pointer flex-col items-center gap-2 rounded-md border p-3 shadow-lg hover:shadow-xl ${
                      selectedAdventureType === adventure.name
                        ? "bg-primary text-white"
                        : ""
                    }`}
                  >
                    <DynamicReactIcon name={adventure.icon || "FaMountain"} />

                    <span
                      className={`border-t pt-1 text-sm font-medium ${
                        selectedAdventureType === adventure.name
                          ? "border-white"
                          : "border-primary"
                      }`}
                    >
                      {adventure.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Choose by Month */}
            <div className="mt-4 md:mt-8">
              <h2 className="text-xl font-semibold md:text-2xl">
                Choose by Month
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                {seasons.map((season, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-white">
                      {season.icon}
                      <span className="text-sm font-medium">{season.name}</span>
                    </div>
                    <div className="mt-2 space-y-1 text-center text-sm">
                      {season.months.map((month, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleMonthClick(season.name, month)}
                          className={`cursor-pointer rounded px-2 py-1 font-medium ${
                            selectedSeason === season.name &&
                            selectedMonth === month
                              ? "bg-primary text-white"
                              : ""
                          }`}
                        >
                          {month}
                        </div>
                      ))}
                    </div>
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
                    onClick={() =>
                      setSelectedExperience(
                        exp.value === selectedExperience ? null : exp.value,
                      )
                    }
                  >
                    <div
                      className={`rounded-full border-[1px] p-2 ${selectedExperience === exp.value ? "bg-primary text-white" : "border-black"}`}
                    >
                      {exp.icon} {/* Render React Icon */}
                    </div>
                    <div
                      className={`flex w-full justify-center rounded-lg border p-2 text-xs uppercase shadow sm:text-sm ${selectedExperience === exp.value ? "bg-primary text-white" : "border-black"}`}
                    >
                      {exp.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* choose by level */}
            <div className="mt-4 md:mt-8">
              <h2 className="text-xl font-semibold md:text-2xl">
                Choose By Skill Level
              </h2>
              <div className="mt-4 grid gap-2 md:grid-cols-2 md:gap-4">
                {levels.map((lvl, index) => (
                  <div key={index} className="overflow-hidden">
                    <button
                      className={`flex w-full cursor-pointer items-center justify-between rounded-es-xl rounded-se-xl px-4 py-2 text-left font-semibold text-white focus:outline-none ${level === lvl.title ? "bg-primary" : "bg-gray-800"}`}
                      onClick={() =>
                        setLevel(level === lvl.title ? null : lvl.title)
                      }
                    >
                      <span className="text-sm md:text-base">{lvl?.title}</span>
                      <span>
                        {level === lvl.title ? (
                          <FaChevronUp size={12} />
                        ) : (
                          <FaChevronDown size={12} />
                        )}
                      </span>
                    </button>
                    <div
                      className={`w-[80%] transition-all duration-500 ease-in-out ${
                        level === lvl.title
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
              <h2 className="text-xl font-semibold md:text-2xl">
                Choose By Height
              </h2>
              <div className="mt-4 space-y-4">
                {heights?.map((ht, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setSelectedHeight((prevHeight) =>
                        prevHeight === ht.name ? null : ht.name,
                      )
                    }
                    className={`max-w-[12rem] cursor-pointer rounded px-4 py-2 text-center text-xs text-white md:text-sm ${
                      selectedHeight === ht.name ? "bg-primary" : "bg-gray-900"
                    }`}
                  >
                    {ht.name}
                  </div>
                ))}
              </div>
            </div>
            {/* Footer */}
            <DialogFooter>
              <Button onClick={handleApplyFilters}>Apply Filters</Button>
              <Button onClick={handleClearFilter} variant="secondary">
                Clear Filters
              </Button>
            </DialogFooter>
          </>
        </DialogContent>
      </Dialog>
    </>
  );
}

const experiences = [
  {
    value: "beginner",
    name: "Beginner (grade I)",
    icon: <FaRegUser />,
  },
  {
    value: "intermediate",
    name: "Intermediate (grade II)",
    icon: <FaBolt />,
  },
  {
    value: "challenging",
    name: "Challenging (grade III)",
    icon: <FaFire />,
  },
  {
    value: "strenuous",
    name: "Strenuous (grade IV)",
    icon: <FaDumbbell />,
  },
  {
    value: "extreme",
    name: "Extreme (grade V)",
    icon: <FaMountain />,
  },
];

const levels = [
  {
    title: "Novice",
    description:
      "Ideal for first-time trekkers with limited or no experience. Basic treks with easy terrain and shorter durations.",
  },
  {
    title: "Intermediate",
    description:
      "For those with some trekking experience. Moderate treks with moderate difficulty, usually lasting longer or with more challenging terrain.",
  },
  {
    title: "Advanced",
    description:
      "For experienced trekkers who are comfortable with longer, more strenuous treks at higher altitudes and tougher terrains.",
  },
  {
    title: "Expert",
    description:
      "For seasoned trekkers and mountaineers with extensive experience. Involves difficult climbs, higher altitudes, and technical challenges.",
  },
  {
    title: "Professional",
    description:
      "For those who lead expeditions or participate in mountaineering at a professional level. Requires advanced technical skills, leadership, and high-altitude experience.",
  },
  {
    title: "Elite",
    description:
      "The highest level, for extreme adventurers and mountaineers. This includes tackling some of the most difficult, dangerous climbs and extreme weather conditions.",
  },
];

const heights = [
  { name: "under 2000m" },
  { name: "above 2000m" },
  { name: "above 7000m" },
  { name: "above 8000m" },
];

const seasons = [
  {
    name: "Winter",
    icon: <FaSnowflake />,
    months: ["December", "January", "February"],
  },
  {
    name: "Spring",
    icon: <GiFlowerEmblem />,
    months: ["March", "April", "May"],
  },
  {
    name: "Summer",
    icon: <FaSun />,
    months: ["June", "July", "August"],
  },
  {
    name: "Autumn",
    icon: <FaLeaf />,
    months: ["September", "October", "November"],
  },
];
