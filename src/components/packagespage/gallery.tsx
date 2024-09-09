/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import React from "react";
export type GalleryImageProp = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export default function Gallery({ images }: { images: GalleryImageProp[] }) {
  return (
    <div className="relative grid grid-cols-3 gap-2 md:gap-4 lg:gap-8">
      {/* Main Image */}
      <div className="col-span-3">
        <div
          className="rounded-lg border bg-white p-1 md:p-2 lg:p-4"
          style={{ boxShadow: "0px 4px 12px 4px rgba(0, 0, 0, 0.3)" }}
        >
          <Image
            src={images?.[0]?.src}
            alt="Main"
            className="w-full object-cover grayscale lg:max-h-96"
            height={images?.[0]?.height}
            width={images?.[0]?.width}
          />
        </div>
      </div>

      {/* Images */}
      {images?.slice(1)?.map((img, index) => (
        <div className="col-span-1" key={index}>
          <div
            className="h-full rounded-lg bg-white p-1 shadow-xl md:p-2 lg:p-4"
            style={{ boxShadow: "0px 4px 12px 4px rgba(0, 0, 0, 0.3)" }}
          >
            <Image
              src={img?.src}
              className="h-full w-full object-cover grayscale"
              alt={`${img.alt}`}
              height={img?.height}
              width={img?.width}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
