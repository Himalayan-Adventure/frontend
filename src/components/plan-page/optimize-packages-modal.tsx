"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaLeaf,
  FaMountain,
  FaSnowflake,
  FaStopwatch,
  FaSun,
  FaTree,
} from "react-icons/fa";
import { MdUpgrade } from "react-icons/md";
import { usePlanContext } from "./plan-context";

export default function OptimizedPackagesModal() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [packages, setPackages] = useState<any>([]);
  const {
    selectedPackageIds,
    setSelectedPackageIds,
    selectedDestinationId,
    selectedPackageType,
  } = usePlanContext();


  useEffect(() => {
    const fetchPackages = async () => {
      try {
        let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}api/packages?fields[0]=package_name&populate[image][populate]0]=image&fields[2]=parent_title&populate[adventure_specification][populate][1]=season&populate[package_host][populate][3]=package_host&populate[adventure_specification][populate][2]=grade`;

        const filters: string[] = [];

        if (selectedDestinationId) {
          filters.push(
            `filters[package_country][id][$eq]=${selectedDestinationId}`,
          );
        }

        if (selectedPackageType && selectedPackageType.length > 0) {
          const packageTypeFilters = selectedPackageType.map(
            (type) => `filters[package_type][$eq]=${type}`,
          );
          filters.push(`(${packageTypeFilters.join("&")})`);
        }

        if (filters.length) {
          url += `?${filters.join("&")}`;
        }

        const response = await axios.get(url);

        if (response?.data?.data) {
          setPackages(response.data.data);
        }
      } catch (err) {
        setError("Failed to fetch packages.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [selectedDestinationId, selectedPackageType]);

  const handleSelectPackage = (pkg: any) => {
    setSelectedPackageIds((prevSelectedIds) =>
      prevSelectedIds.includes(pkg?.id)
        ? prevSelectedIds.filter((id) => id !== pkg?.id)
        : [...prevSelectedIds, pkg?.id],
    );
  };

  if (loading) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm text-white shadow-lg shadow-gray-500 transition-colors duration-300 hover:bg-opacity-80 md:text-base">
            Optimize Package
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Optimized Packages</DialogTitle>
            <DialogDescription>Loading...</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm text-white shadow-lg shadow-gray-500 transition-colors duration-300 hover:bg-opacity-80 md:text-base">
          Optimize Package
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] max-h-[60vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Optimized Packages</DialogTitle>
          <DialogDescription>
            Select the best package for you based on your preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error ? (
            <p className="py-8 text-left text-red-500">{error}</p>
          ) : packages.length > 0 ? (
            packages.map((pkg: any) => (
              <div
                key={pkg?.id}
                className="flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <div className="max-h-32 overflow-hidden rounded sm:w-1/4">
                  <img
                    src={
                      pkg?.attributes?.image?.data?.[0]?.attributes?.url ||
                      "/placeholder.jpg"
                    }
                    alt={pkg?.attributes?.package_name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="border-black sm:w-2/4 sm:border-r">
                  <h3 className="text-left text-lg font-semibold">
                    {pkg?.attributes?.package_name}
                  </h3>
                  <ul className="mt-2 space-y-1 text-left text-sm">
                    {pkg?.attributes?.adventure_specification?.season?.[0]
                      ?.name && (
                      <li className="flex items-center gap-2">
                        {(() => {
                          const season =
                            pkg?.attributes?.adventure_specification?.season?.[0]?.name.toLowerCase();
                          switch (season) {
                            case "summer":
                              return <FaSun />;
                            case "winter":
                              return <FaSnowflake />;
                            case "spring":
                              return <FaLeaf />;
                            case "autumn":
                              return <FaTree />;
                            default:
                              return null;
                          }
                        })()}
                        <span className="font-medium capitalize">
                          {
                            pkg?.attributes?.adventure_specification
                              ?.season?.[0]?.name
                          }
                        </span>
                      </li>
                    )}
                    <li className="flex items-center gap-2">
                      <FaStopwatch />
                      <span className="font-medium">Duration:</span>{" "}
                      {pkg?.attributes?.adventure_specification?.duration} days
                    </li>
                    <li className="flex items-center gap-2">
                      <MdUpgrade />
                      <span className="font-medium">Grade:</span>{" "}
                      {
                        pkg?.attributes?.adventure_specification?.grade?.[0]
                          ?.name
                      }
                    </li>
                    <li className="flex items-center gap-2">
                      <FaMountain />
                      <span className="font-medium">Max Altitude:</span>{" "}
                      {pkg?.attributes?.adventure_specification?.max_altitude}
                    </li>
                  </ul>
                </div>
                <div className="h-full">
                  <button
                    onClick={() => handleSelectPackage(pkg)}
                    className={`rounded-full px-4 py-2 text-white ${
                      selectedPackageIds.includes(pkg?.id)
                        ? "bg-primary"
                        : "bg-black"
                    }`}
                  >
                    {selectedPackageIds.includes(pkg?.id)
                      ? "Selected"
                      : "Select"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="py-8 text-left">
              No packages available according to your preferences
            </p>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="rounded bg-primary p-2 px-4 text-white">
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
