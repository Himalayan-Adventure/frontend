"use client";
import SearchBar from "@/components/ui/search-bar";
import { useServiceType } from "@/store/get-service-type";
export function SortFilters() {
  const { type, setType } = useServiceType();
  return (
    <div className="z-[52] flex gap-x-4 rounded-lg border border-gray-200 bg-white p-2">
      {type === "guides" ? (
        <SearchBar selector="name" />
      ) : (
        <SearchBar selector="service-name" />
      )}
    </div>
  );
}
