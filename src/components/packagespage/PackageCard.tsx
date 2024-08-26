/* eslint-disable @next/next/no-img-element */
import { MdOutlineSevereCold, MdTimelapse } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { FaMountain } from "react-icons/fa";

const PackageCard = ({ pkg }: any) => {
  return (
    <div className="transform cursor-pointer overflow-hidden rounded-xl bg-white p-4 shadow-xl shadow-gray-500 transition-transform">
      <div className="relative">
        <img
          src={pkg?.image}
          alt={pkg?.title}
          className="h-80 w-full rounded rounded-es-3xl rounded-se-3xl object-cover xl:h-96"
        />
        <div className="py-2">
          <div className="flex w-full justify-end">
            <p className="text-sm">⭐ {pkg?.rating}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-primary">{pkg?.title}</p>
            <p className="mb-2 text-sm font-light">Host: {pkg?.host}</p>
            <p className="font-extrabold text-primary">Get Quote</p>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between overflow-auto rounded rounded-es-3xl rounded-se-3xl bg-black bg-opacity-70 p-4 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">Departure</p>
              <p className="text-sm">
                ⭐ {pkg?.rating}{" "}
                <a href="#" className="underline">
                  7 reviews
                </a>
              </p>
            </div>
            <div className="my-2 rounded bg-white p-2">
              {pkg?.departureDates.map((date: string, index: number) => (
                <div
                  key={index}
                  className="mt-2 flex items-end justify-between"
                >
                  <div className="text-black">
                    <p className="text-sm">Date</p>
                    <p className="text-xs">{date}</p>
                  </div>
                  <div>
                    <button className="rounded-full bg-black px-2 py-1 text-xs text-white">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded bg-orange-500 py-2 font-semibold text-white hover:bg-orange-600">
              Get Quote
            </button>
          </div>
          <div className="mt-4 space-y-2">
            <p className="mb-4 text-center text-sm">You won’t be charged yet</p>
            <p className="flex items-center space-x-2 text-sm font-medium">
              <MdOutlineSevereCold size={20} />
              <span>Winter: {pkg?.season}</span>
            </p>
            <p className="flex items-center space-x-2 text-sm font-medium">
              <MdTimelapse size={20} />
              <span>Duration: {pkg?.duration}</span>
            </p>
            <p className="flex items-center space-x-2 text-sm font-medium">
              <BsBarChartFill size={20} />
              <span>Grade: {pkg?.grade}</span>
            </p>
            <p className="flex items-center space-x-2 text-sm font-medium">
              <FaMountain size={20} />
              <span>Max Altitude: {pkg?.maxAltitude}</span>
            </p>
          </div>

          <hr className="mt-2" />

          <div className="flex w-full justify-center">
            <button className="mt-4 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
