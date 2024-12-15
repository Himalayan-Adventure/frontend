"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

interface OptimizedPackagesModalProps {
  packages: { name: string; price: string; description: string }[];
}

export default function OptimizedPackagesModal({
  packages,
}: OptimizedPackagesModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`rounded-lg bg-primary px-4 py-2 text-sm text-white shadow-lg shadow-gray-500 transition-colors duration-300 hover:bg-opacity-80 md:text-base`}
        >
          Optimize Package
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Optimized Packages</DialogTitle>
          <DialogDescription>
            Select the best package for you based on your preferences
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {packages.length > 0 ? (
            packages.map((pkg, index) => (
              <div key={index} className="rounded-lg border p-4 shadow-md">
                <h3 className="text-lg font-semibold">{pkg.name}</h3>
                <p className="text-sm text-gray-600">{pkg.description}</p>
                <p className="mt-2 text-lg font-bold">{pkg.price}</p>
              </div>
            ))
          ) : (
            <p>No optimized packages available.</p>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="bg-primary text-white p-2 rounded px-4">Close</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
