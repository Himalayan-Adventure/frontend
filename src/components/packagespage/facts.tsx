"use client";

import { IDProperty } from "@/types/types";
import Image from "next/image";
import DynamicReactIcon from "../icons/strapi-icon";
const CloudImage = ({ src, alt, position }: any) => (
  <div className={`absolute ${position} w-full`}>
    <Image src={src} alt={alt} width={1920} height={150} className="w-full" />
  </div>
);
import FactsBg from "/public/images/Mt-1.png";

export default function FactsOfTheTrip({
  data,
}: {
  data?:
    | (IDProperty &
        Omit<
          {
            title?: string | undefined;
            fact_info?:
              | (IDProperty &
                  Omit<
                    {
                      title?: string | undefined;
                      details?: string | undefined;
                      icon?: string | undefined;
                    } & {},
                    never
                  >[])
              | undefined;
          } & {},
          never
        >[])
    | undefined;
}) {
  return (
    <section className="relative my-8 flex min-h-screen items-center bg-cover bg-center bg-no-repeat lg:my-16">
      <div className="absolute inset-0 -z-20 min-h-screen bg-cover bg-center bg-no-repeat" />
      <Image
        src={FactsBg}
        alt="facts-section-bg"
        layout="fill"
        objectFit="cover"
        className="absolute -z-20 h-full w-full grayscale"
      />
      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-black bg-opacity-50"></div>

      <div className="from-gray absolute top-0 h-20 w-full bg-gradient-to-b"></div>
      <div className="container py-8 lg:py-16">
        <div className="relative text-white">
          <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
            Facts of the Trip
          </h1>
          {/* <div className="mt-4 grid grid-cols-1 gap-x-8 lg:mt-8 lg:grid-cols-2"> */}
          {data?.map((fact, index) => (
            <div
              key={index}
              className="mt-4 grid grid-cols-1 gap-x-8 lg:mt-8 lg:grid-cols-2"
            >
              {fact?.fact_info?.map((item, index) => (
                <div
                  key={index}
                  className="mb-2 grid grid-cols-[170px_auto] space-x-3 lg:mb-4"
                >
                  <p className="col-span-1 text-xs md:text-sm lg:text-base">
                    {item.title}
                  </p>

                  <div className="flex items-center space-x-1">
                    <div className="text-primary">
                      {item.icon && (
                        <DynamicReactIcon
                          className="size-5 text-primary md:size-6"
                          color="#FD9100"
                          fill="#FD9100"
                          name={item.icon}
                        />
                      )}
                    </div>

                    <p className="text-xs md:text-sm lg:text-base">
                      {item.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {/* <div>
              {data?.map((fact, index) => (
                <div
                  key={index}
                  className="mb-2 grid grid-cols-3 space-x-3 lg:mb-4"
                >
                  <p className="col-span-1 text-xs font-semibold md:text-sm lg:text-base">
                    {fact.label}
                  </p>

                  <div className="col-span-2 flex items-center space-x-1">
                    <span className="text-primary">{fact.icon}</span>

                    <p className="text-xs md:text-sm lg:text-base">
                      {fact.value}
                    </p>
                  </div>
                </div>
              ))}
            </div> */}
        </div>
      </div>
      {/* </div> */}

      <CloudImage
        src="/images/cloudup.png"
        alt="cloud"
        position="left-0 top-0 lg:-top-12 -z-10"
      />
      <CloudImage
        src="/images/cloud.png"
        alt="cloud"
        position="bottom-0 left-0 lg:-bottom-10 -z-10"
      />
    </section>
  );
}
