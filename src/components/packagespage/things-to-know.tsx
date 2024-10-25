import { TThingsToKnowTabs } from "@/types/packages/things-to-know";
import { IDProperty } from "@/types/types";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import React from "react";
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

export default function ThingsToKnow({
  data,
}: {
  // data: {
  //   cancellationPolicy: string | undefined;
  //   generalInfo:
  //     | (IDProperty &
  //         Omit<
  //           {
  //             icon?: string | undefined;
  //             info?: string | undefined;
  //           } & {},
  //           never
  //         >[])
  //     | undefined;
  //   health:
  //     | (IDProperty &
  //         Omit<
  //           {
  //             icon?: string | undefined;
  //             info?: string | undefined;
  //           } & {},
  //           never
  //         >[])
  //     | undefined;
  // };
  // data?Record<TThingsToKnowTags,(IDProperty &
  //       Omit<
  //         {
  //           name?: string | undefined;
  //           icon?: string | undefined;
  //           value?: string | undefined;
  //         } & {},
  //         never
  //       >[])
  //   | undefined;
  data:
    | (IDProperty &
        Omit<
          {
            title?: string | undefined;
            things_info?:
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
          } & {},
          never
        >[])
    | undefined;
}) {
  return (
    <section className="container py-4 lg:py-8">
      <h2 className="mb-6 text-2xl font-semibold">Things to know</h2>
      <div className="grid grid-cols-1 gap-8 text-sm md:grid-cols-3 md:text-base">
        {data?.map((i) => (
          <div key={i.title}>
            <h3 className="mb-4 font-semibold">Expedition General Info</h3>
            <ul className="space-y-2">
              {i?.things_info?.map((fact, index) => (
                <div
                  key={index}
                  className="mb-2 grid grid-cols-3 space-x-3 lg:mb-4"
                >
                  <div className="col-span-2 flex items-center space-x-1">
                    {fact.icon && <DynamicReactIcon name={fact.icon} />}
                    {/* <span className="">{fact.icon}</span> */}

                    <p className="text-xs md:text-sm lg:text-base">
                      {fact.details}
                    </p>
                  </div>
                </div>
              ))}
            </ul>
          </div>
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
