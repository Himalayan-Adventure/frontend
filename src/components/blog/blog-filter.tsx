import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import useUpdateQueryString from "@/hooks/use-update-query-string";

interface BlogFilterBarProps {
  categories: { id: number; attributes: { name: string } }[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function BlogFilterBar({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: BlogFilterBarProps) {
  const updateQueryString = useUpdateQueryString();
  return (
    <section className="relative py-8 lg:mt-32 lg:py-16">
      <div className="flex w-full items-center justify-center">
        <div className="mb-6 flex items-center gap-2 md:gap-4">
          {/* Categories Button with Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center justify-center space-x-2 rounded-full border border-black px-2 py-1 text-xs sm:w-auto md:text-sm lg:px-4 lg:py-2 lg:text-base">
                <MdCategory size={20} />
                <span>{selectedCategory || "Select Category"}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="max-h-60 w-60 overflow-y-auto rounded-md bg-white p-2 shadow-lg">
              <ul>
                <li
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setSelectedCategory("Categories")}
                >
                  Categories
                </li>
                {categories?.map((category) => (
                  <li
                    key={category.id}
                    className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      updateQueryString({
                        ["categoryID"]: category.id.toString(),
                      });

                      setSelectedCategory(category.attributes.name);
                    }}
                  >
                    {category.attributes.name}
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>

          {/* Search Bar */}
          <div className="flex w-full items-center rounded-full border border-gray-400 px-2 py-1 sm:w-80 md:w-[28rem] lg:w-[40rem] lg:px-4 lg:py-2">
            <FiSearch size={24} className="text-xs text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="ml-2 w-full bg-transparent py-2 text-xs outline-none sm:text-sm md:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
