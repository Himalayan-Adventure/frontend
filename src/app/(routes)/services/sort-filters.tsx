"use client";
import SearchBar from "@/components/ui/search-bar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { getServiceCategories } from "@/server/services/get-services-categories";
import { useQuery } from "@tanstack/react-query";
export function SortFilters() {
  const updateQueryString = useUpdateQueryString();
  const { data: categories } = useQuery({
    queryKey: ["services-categories"],
    queryFn: async () => await getServiceCategories(),
  });
  return (
    <div className="z-10 flex gap-x-4 rounded-lg border border-gray-200 bg-white p-2">
      <Select
        onValueChange={(value) => {
          if (value !== "all") {
            updateQueryString({ category: value });
          } else {
            updateQueryString({}, ["category"]);
          }
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filters" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>

            <SelectItem value={"all"}>All</SelectItem>
            {categories?.data?.length === 0 ? (
              <Text variant="text-sm">No categories available</Text>
            ) : (
              categories?.data.map((i) => (
                <SelectItem
                  key={`services-categories-${i.id}`}
                  value={i.attributes.name}
                >
                  {i.attributes.name}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <SearchBar selector="name" />
    </div>
  );
}
