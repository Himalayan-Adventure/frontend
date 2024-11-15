import { useState } from "react";
import { FiList, FiSearch } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ProductFilterBarProps {
  categories: any;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

export default function ProductFilterBar({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
}: ProductFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="container relative mx-auto py-8 lg:mt-32 lg:py-16">
      <div className="flex w-full items-center justify-center">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          {/* Categories Button with Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="order-2 flex items-center justify-center space-x-2 rounded-lg border border-black px-2 py-1 text-xs sm:w-auto md:text-sm lg:order-1 lg:px-4 lg:py-2 lg:text-base">
                <MdCategory size={20} />
                <span>{selectedCategory}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48 rounded-md bg-white p-2 shadow-lg">
              <ul>
                <li
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setSelectedCategory("All Categories")}
                >
                  All Categories
                </li>
                {categories?.data?.map((category: any) => (
                  <li
                    key={category.id}
                    className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() =>
                      setSelectedCategory(category.attributes.name)
                    }
                  >
                    {category.attributes.name}
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>

          {/* Search Bar */}
          <div className="order-1 flex w-full items-center rounded-full border border-gray-400 px-2 py-1 sm:w-80 md:w-[28rem] lg:order-2 lg:w-[40rem] lg:px-4 lg:py-2">
            <FiSearch size={24} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="ml-2 py-1 w-full bg-transparent outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort By Button with Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="order-3 flex items-center justify-center space-x-2 rounded-lg border border-black px-2 py-1 text-xs sm:w-auto md:text-sm lg:px-4 lg:py-2 lg:text-base">
                <FiList size={20} />
                <span>Sort By {sortOption}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48 rounded-md bg-white p-2 shadow-lg">
              <ul>
                <li
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setSortOption("")}
                >
                  Default
                </li>
                <li
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setSortOption("Price: Low to High")}
                >
                  Price: Low to High
                </li>
                <li
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setSortOption("Price: High to Low")}
                >
                  Price: High to Low
                </li>
                <li
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setSortOption("Name: A to Z")}
                >
                  Name: A to Z
                </li>
                <li
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setSortOption("Name: Z to A")}
                >
                  Name: Z to A
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </section>
  );
}
