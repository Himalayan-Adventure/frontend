import { useState } from "react";
import { FiList, FiSearch } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ProductFilterBarProps {
  categories: any;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (subcategory: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  setSearchQuery: (query: string) => void;
}

export default function ProductFilterBar({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  sortOption,
  setSortOption,
  setSearchQuery,
}: ProductFilterBarProps) {
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);

  // Timer state to handle mouse enter/leave delay
  let delayTimer: NodeJS.Timeout;

  const handleMouseEnterCategory = (categoryId: number) => {
    clearTimeout(delayTimer); // Clear any timer if already set
    setOpenCategoryId(categoryId);
  };

  const handleMouseLeaveCategory = () => {
    delayTimer = setTimeout(() => setOpenCategoryId(null), 200); // 200ms delay
  };

  return (
    <section className="container relative mx-auto py-8 lg:mt-32 lg:py-16">
      <div className="flex w-full items-center justify-center">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          {/* Categories Button with Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="order-2 flex items-center justify-center space-x-2 rounded-lg border border-black px-2 py-1 text-xs sm:w-auto md:text-sm lg:order-1 lg:px-4 lg:py-2 lg:text-base">
                <MdCategory size={20} />
                <span>{selectedCategory || "Select Category"}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48 rounded-md bg-white p-2 shadow-lg">
              <ul>
                <li
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    setSelectedCategory("All Categories");
                    setSelectedSubcategory("");
                  }}
                >
                  All Categories
                </li>
                {categories?.data?.map((category: any) => (
                  <li
                    key={category.id}
                    className="group relative"
                    onMouseEnter={() => handleMouseEnterCategory(category.id)}
                    onMouseLeave={handleMouseLeaveCategory}
                  >
                    <div
                      className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() =>
                        setSelectedCategory(category.attributes.name)
                      }
                    >
                      {category.attributes.name}
                    </div>
                    {openCategoryId === category.id &&
                      category.attributes.shop_sub_categories && (
                        <div
                          className="absolute left-full top-0 w-48 border border-gray-200 bg-white shadow-lg"
                          onMouseEnter={() => clearTimeout(delayTimer)} // Keep subcategory menu open
                          onMouseLeave={handleMouseLeaveCategory} // Close with delay on leave
                        >
                          <ul>
                            {category.attributes.shop_sub_categories?.data.map(
                              (subCategory: any) => (
                                <li
                                  key={subCategory.id}
                                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                                  onClick={() =>
                                    setSelectedSubcategory(
                                      subCategory.attributes.name,
                                    )
                                  }
                                >
                                  {subCategory.attributes.name}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
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
              className="ml-2 w-full bg-transparent py-1 outline-none"
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
