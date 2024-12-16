"use client";

import FilterBox from "@/components/home/Filters";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import filterCategories from "@/config/packages-filters";
import { useOverflowDetection } from "@/hooks/use-overflow-detection";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaBorderAll } from "react-icons/fa";

export const PackageFilter = () => {
  // for handling navlinks overflow in mobile
  const containerRef = useRef<HTMLDivElement>(null);
  const overflowDir = useOverflowDetection(containerRef);
  const [curScrollX, setCurScrollX] = useState(0);
  useEffect(() => {
    const scrollFn = (e: Event) => {
      setCurScrollX(containerRef?.current?.scrollLeft || 0);
    };
    containerRef?.current?.addEventListener("scroll", scrollFn);
    return () => containerRef?.current?.removeEventListener("scroll", scrollFn);
  }, []);
  const updateQueryString = useUpdateQueryString();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    key: string;
  }>({
    name: searchParams.get("key") || "All",
    key: searchParams.get("filter") || "none",
  });
  return (
    <div className="relative mb-8 flex items-center gap-x-2">
      {overflowDir === "left" || overflowDir === "both" ? (
        <div className="absolute left-4 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black shadow-lg shadow-white/10 lg:hidden">
          <ChevronLeft
            className="animate-chevron-left absolute text-xl text-primary"
            onClick={() =>
              containerRef?.current?.scroll({
                top: 0,
                left: curScrollX - 150,
                behavior: "smooth",
              })
            }
          />
        </div>
      ) : null}
      <div className="hide-scrollbar flex overflow-x-auto" ref={containerRef}>
        <button
          onClick={() => {
            updateQueryString({}, ["filter", "key"]);
          }}
          className={`mx-4 flex cursor-pointer flex-col items-center border-b-2 py-2 text-sm font-extrabold md:text-base ${
            searchParams.get("filter") === "All" ||
            searchParams.get("filter") === null
              ? "border-b-2 border-primary text-primary"
              : "border-transparent text-neutral-500"
          }`}
        >
          <FaBorderAll className="size-6 md:size-8" />
          <span className="max-w-24 text-center text-sm">All</span>
        </button>
        {filterCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => {
              if (category.key === "none") {
                updateQueryString({}, ["filter", "key"]);
                setSelectedCategory({
                  name: category.name,
                  key: category.key,
                });
              } else {
                updateQueryString({
                  key: category.key,
                  filter: category.name,
                });
                setSelectedCategory({
                  name: category.name,
                  key: category.key,
                });
              }
            }}
            className={`mx-4 flex cursor-pointer flex-col items-center border-b-2 py-2 text-sm font-extrabold md:text-base ${
              searchParams.get("filter") === category.name ||
              (category.name === "All" && searchParams.get("filter") === null)
                ? "border-b-2 border-primary text-primary"
                : "border-transparent text-neutral-500"
            }`}
          >
            {category.icon}
            <span className="max-w-24 text-center text-sm">
              {category.label}
            </span>
          </button>
        ))}
      </div>

      {overflowDir === "right" || overflowDir === "both" ? (
        <div className="absolute right-4 top-1/2 z-10 grid aspect-square h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black shadow-xl shadow-white/10 lg:hidden">
          <ChevronRight
            className="animate-chevron-right absolute text-xl text-primary"
            onClick={() =>
              containerRef?.current?.scroll({
                top: 0,
                left: curScrollX + 150,
                behavior: "smooth",
              })
            }
          />
        </div>
      ) : null}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-white text-primary hover:text-white">
            <SlidersHorizontal size={16} />
            <p>View filters</p>
          </Button>
        </DialogTrigger>
        <FilterBox />
      </Dialog>
    </div>
  );
};
