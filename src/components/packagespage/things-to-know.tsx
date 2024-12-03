"use client";
import { TThingsToKnowTabs } from "@/types/packages/things-to-know";
import { IDProperty } from "@/types/types";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import React, { useState } from "react";
import {
  FaClock,
  FaLock,
  FaBan,
  FaSmokingBan,
  FaPaw,
  FaTimesCircle,
} from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import {
  MdCleaningServices,
  MdSocialDistance,
  MdSmokeFree,
  MdOutlineSecurity,
} from "react-icons/md";
import { RiAlarmWarningLine } from "react-icons/ri";
import DynamicReactIcon from "../icons/strapi-icon";
import { Text } from "../ui/text";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const thingsToKnowItems = [
  {
    title: "Expedition General Info",
    items: [
      { icon: <FaClock />, text: "Check-in: After 4:00 PM" },
      { icon: <FaClock />, text: "Checkout: 10:00 AM" },
      { icon: <FaLock />, text: "Self check-in with lockbox" },
      { icon: <FaBan />, text: "Not suitable for infants (under 2 years)" },
      { icon: <FaSmokingBan />, text: "No smoking" },
      { icon: <FaPaw />, text: "No pets" },
      { icon: <GiPartyPopper />, text: "No parties or events" },
    ],
  },
  {
    title: "Health & safety",
    items: [
      {
        icon: <MdCleaningServices />,
        text: "Committed to Airbnb's enhanced cleaning process.",
        link: "Show more",
      },
      {
        icon: <MdSocialDistance />,
        text: "Airbnb's social-distancing and other COVID-19-related guidelines apply",
      },
      { icon: <RiAlarmWarningLine />, text: "Carbon monoxide alarm" },
      { icon: <MdSmokeFree />, text: "Smoke alarm" },
      {
        icon: <MdOutlineSecurity />,
        text: "Security Deposit - if you damage the home, you may be charged up to $566",
      },
    ],
  },
  {
    title: "Cancellation policy",
    items: [{ text: "Free cancellation before Feb 14", link: "Show more" }],
  },
];
type ThingsInfo =
  | (IDProperty &
      Omit<
        {
          details?: string | undefined;
          title?: string | undefined;
          icon?: string | undefined;
        } & {},
        never
      >[])
  | undefined;

type ThingsToKnow = IDProperty & {
  title?: string | undefined;
  things_info?: ThingsInfo[] | undefined;
};
type TData = Omit<
  {
    title?: string | undefined;
    things_info?: ThingsInfo;
  } & {},
  never
>;

export default function ThingsToKnow({
  data,
}: {
  data: (IDProperty & TData[]) | undefined;
  //  data:ThingsToKnow
  // data:
  //   | (IDProperty &
  //       Omit<
  //         {
  //           title?: string | undefined;
  //           things_info?:
  //             | (IDProperty &
  //                 Omit<
  //                   {
  //                     details?: string | undefined;
  //                     title?: string | undefined;
  //                     icon?: string | undefined;
  //                   } & {},
  //                   never
  //                 >[])
  //             | undefined;
  //         } & {},
  //         never
  //       >[])
  //   | undefined;
}) {
  return (
    <section className="container py-4 lg:py-8">
      <h2 className="mb-6 text-2xl font-semibold">Things to know</h2>
      <div className="grid grid-cols-1 gap-8 text-sm md:grid-cols-3 md:text-base">
        {data?.map((i, index) => (
          <ThingsRow key={`i.title-${index}`} data={i} />
        ))}
        {/* <div>
          <h3 className="mb-4 font-semibold">Expedition General Info</h3>
          <ul className="space-y-2">
            {data?.generalInfo?.map((fact, index) => (
              <div
                key={index}
                className="mb-2 grid grid-cols-3 space-x-3 lg:mb-4"
              >
                <div className="col-span-2 flex items-center space-x-1">
                  {fact.icon && <DynamicReactIcon name={fact.icon} />}
                  <p className="text-xs md:text-sm lg:text-base">{fact.info}</p>
                </div>
              </div>
            ))}
          </ul>
        </div> */}

        {/* <div>
          <h3 className="mb-4 font-semibold">Health & Safety</h3>
          <ul className="space-y-2">
            {data?.health?.map((fact, index) => (
              <div
                key={index}
                className="mb-2 grid grid-cols-2 space-x-3 lg:mb-4"
              >
                <div className="col-span-2 flex items-center space-x-1">
                  {fact.icon && <DynamicReactIcon name={fact.icon} />}

                  <p className="text-xs md:text-sm lg:text-base">{fact.info}</p>
                </div>
              </div>
            ))}
          </ul>
        </div> */}

        {/* <div>
          <h3 className="mb-4 font-semibold">Cancellation Policy</h3>
          <p>{data.cancellationPolicy}</p>
        </div> */}
        {/* {data.map(({ title, items }, index) => (
          <div key={index}>
            <h3 className="mb-4 font-semibold">{title}</h3>
            <ul className="space-y-2">
              {items.map(({ icon, text, link }: any, i) => (
                <li key={i} className="flex">
                  {icon && <span className="mr-2">{icon}</span>}
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))} */}
      </div>
    </section>
  );
}
const ThingsRow = ({ data }: { data: TData }) => {
  const [showMore, setShowMore] = useState(
    data.things_info ? data.things_info?.length > 8 : false,
  );
  return (
    <div key={data.title} className="space-y-2">
      <h3 className="mb-4 font-semibold">{data.title}</h3>
      <ul className="space-y-2">
        {(showMore ? data?.things_info : data?.things_info?.slice(0, 8))?.map(
          (fact, index) => (
            <div
              key={`things-toknow ${data.title}-${index}`}
              className={cn(
                fact.icon ? "grid-cols-[40px_auto]" : "",
                "mb-2 grid lg:mb-4",
              )}
            >
              {fact.icon && (
                <DynamicReactIcon
                  className="size-5 md:size-6"
                  name={fact.icon}
                />
              )}
              <p className="text-xs md:text-sm lg:text-base">{fact?.title}</p>
            </div>
          ),
        )}
      </ul>
      {data?.things_info && data?.things_info?.length > 8 && (
        <Text
          variant="text-md"
          semibold
          onClick={() => setShowMore(!showMore)}
          className="flex cursor-pointer items-center gap-x-0.5 underline hover:gap-x-1.5"
        >
          Show {!showMore ? "more" : "less"}
          <ChevronRight size={13} />
        </Text>
      )}
    </div>
  );
};
