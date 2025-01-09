import { seasonMonthMap, seasonIconMap } from "@/config/ui-constants";
import { cn, formatDate } from "@/lib/utils";
import { TDepartureData } from "@/types/packages/departure";
import { APIResponseData } from "@/types/types";
import Link from "next/link";
import { forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineClose } from "react-icons/ai";
import { BsBarChartFill } from "react-icons/bs";
import { FaMountain } from "react-icons/fa";
import { LuStar } from "react-icons/lu";
import { MdTimelapse } from "react-icons/md";
import wordsToNumbers from "words-to-numbers";
import { DepartureFact } from "../departure";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { QuotesDialog } from "../quote";
import { useCurrentUser } from "@/hooks/user-current-user";
import { toast } from "sonner";
export const Overlay = forwardRef<
  HTMLDivElement,
  {
    pkg: APIResponseData<"api::package.package">;
    isOverlayVisible: boolean;
    className?: string;
  }
>((props, ref) => {
  const { pkg, isOverlayVisible, className } = props;
  const attr = pkg.attributes;

  const departureData: TDepartureData = {
    //date: pkg?.date as string,
    departure: [
      {
        start:
          attr?.adventure_specification?.travel_dates?.[0]?.date || new Date(),
        end:
          attr?.adventure_specification?.travel_dates?.[1]?.date || new Date(),
      },
    ],
    grade: attr?.adventure_specification?.grade?.[0]?.name || "",
    altitude: attr?.adventure_specification?.max_altitude.toString() || "",
    duration: attr?.adventure_specification?.duration || "",
    season: attr?.adventure_specification?.season?.[0]?.name || "",
  };
  const { duration, season, altitude, grade, departure } = departureData;

  const maxAltInM = Number(
    wordsToNumbers(altitude)?.toString().split(" ").join(""),
  );
  let departureFacts = [];
  if (season)
    departureFacts.push({
      title: season,
      desc: seasonMonthMap[season],
      icon: seasonIconMap[season],
    });
  if (duration) {
    departureFacts.push({
      title: "duration",
      desc: duration + " days",
      icon: <MdTimelapse size={20} />,
    });
  }
  const { user, isPending } = useCurrentUser();
  console.log(user, isPending);

  return (
    <div
      id={`overlay-${pkg.id}`}
      ref={ref}
      className={cn(
        className,
        isOverlayVisible ? "z-50 opacity-100" : "-z-50 opacity-0",
        "overlay absolute inset-0 mx-auto flex flex-col justify-between overflow-auto bg-black bg-opacity-70 p-4 text-white transition-all ease-in-out",
      )}
    >
      <div className="absolute right-0 top-0 hidden -translate-y-1/2 translate-x-1/2 justify-end bg-black/40">
        <button
          // onClick={toggleOverlay}
          className="text-white hover:text-gray-400"
        >
          <AiOutlineClose size={16} />
        </button>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">Departure</p>
          <p className="flex items-center space-x-1 text-sm">
            <span>
              <LuStar className="text-primary" />
            </span>
            <span>{Math.floor(Math.random() * 5)}</span>
            <span className="text-xl text-gray-400">·&nbsp;</span>
            <a href="#" className="underline">
              {Math.floor(Math.random() * 100)} reviews
            </a>
          </p>
        </div>
        {departure && departure?.filter((i) => i.start || i.end).length > 0 && (
          <div className="my-2 rounded border bg-white p-1">
            {departure?.map((i, index) => (
              <div
                className="mt-2 flex items-center justify-between"
                key={`departure-${index}`}
              >
                <div className="">
                  <p className="text-xs text-black">Date</p>
                  <p
                    className="text-xs text-gray-500"
                    key={`departure-${index}`}
                  >
                    {formatDate(i?.start as string)} -{" "}
                    {formatDate(i?.end as string)}
                  </p>
                </div>

                {!user || isPending? (
                  <Button
                    className="h-fit rounded-full bg-black px-2 py-0.5 text-xs text-white"
                    onClick={() => {
                      toast.error("Please login to get a booking");
                    }}
                  >
                    Book Now
                  </Button>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="h-fit rounded-full bg-black px-2 py-0.5 text-xs text-white">
                        Book Now
                      </Button>
                    </DialogTrigger>
                    <QuotesDialog packageId={pkg?.id} title="Book now" />
                  </Dialog>
                )}
              </div>
            ))}
          </div>
        )}
        {!user || isPending ? (
          <Button
            className="h-10 w-full"
            onClick={() => {
              toast.error("Please login to get a quote");
            }}
          >
            Get Quote
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-10 w-full">Get Quote</Button>
            </DialogTrigger>
            <QuotesDialog packageId={pkg?.id} />
          </Dialog>
        )}
      </div>
      <div className="mt-2 space-y-2">
        <p className="mb-2 text-center text-sm">You won’t be charged yet</p>
        {season && (
          <DepartureFact
            title={season}
            desc={seasonMonthMap[season]}
            icon={seasonIconMap[season]}
          />
        )}

        {duration && (
          <DepartureFact
            title={"duration"}
            desc={duration + " days"}
            icon={<MdTimelapse size={20} />}
          />
        )}

        {grade && (
          <DepartureFact
            title="grade"
            desc={grade}
            icon={<BsBarChartFill size={20} />}
          />
        )}

        {altitude && maxAltInM && maxAltInM !== 0 && (
          <DepartureFact
            title="max altitude"
            desc={`${maxAltInM.toLocaleString("en-us")}m/${(maxAltInM * 3.281).toLocaleString("en-us")}ft`}
            icon={<FaMountain size={20} />}
          />
        )}
      </div>

      <hr className="mx-auto mt-2 w-[90%]" />

      <div className="flex w-full justify-center">
        <Link
          prefetch={true}
          href={`packages/${pkg?.id}`}
          className="mt-4 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-orange-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
});

Overlay.displayName = "Overlay";
