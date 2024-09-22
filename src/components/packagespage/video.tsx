"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaPlay } from "react-icons/fa";

interface VideoProps {
  packageName: string;
  videolink: string;
}

export default function Video({ packageName, videolink }: VideoProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="relative h-80 w-full overflow-hidden rounded">
        <img
          src="https://miro.medium.com/v2/resize:fit:900/1*67sKUBsfJTCq1h4sIVnkvg.jpeg"
          alt=""
          className="h-80 w-full object-cover object-bottom grayscale"
        />
        <div className="absolute inset-0 flex h-full w-full items-end bg-gray-100 bg-opacity-10 p-4">
          <div className="flex flex-col space-y-2">
            <div className="text-lg font-bold text-white md:text-xl lg:text-3xl">
              {packageName}
            </div>
            <div className="flex">
              <button
                onClick={openDialog}
                className="flex items-center space-x-2 bg-white px-4 py-2 text-black transition-all duration-300 hover:bg-gray-100 focus:outline-none active:scale-95"
              >
                <span className="text-lg">Play</span>
                <span>
                  <FaPlay size={20} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Shadcn Dialog for playing YouTube video */}
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-5xl">
          <div
            className="relative overflow-hidden"
            style={{ paddingTop: "56.25%" }}
          >
            <iframe
              src={videolink}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
              className="absolute inset-0 h-full w-full"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
