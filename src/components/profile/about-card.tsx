"use client";
import { getServices } from "@/server/services/get-services";
import { TUserDeep } from "@/types/auth";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { UserRound } from "lucide-react";
import DynamicReactIcon from "../icons/strapi-icon";
import { cn } from "@/lib/utils";
export const AboutCard = ({ user }: { user: TUserDeep | null }) => {
  return (
    <div className="h-full w-full rounded-xl bg-white">
      {/* About section */}
      <div className="space-y-2 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="relative w-fit">
            <h1 className="w-fit text-3xl font-bold text-foreground">About</h1>
            <Separator className="h-2 w-auto bg-black" />
          </div>
          <p className="mt-4 text-black">
            {user?.about?.description || "No description provided"}
          </p>
        </div>
      </div>
      {user && user.userType === "merchant" && <Services user={user} />}
    </div>
  );
};

const Services = ({ user }: { user: TUserDeep }) => {
  const { data, isPending } = useQuery({
    queryKey: ["services"],
    queryFn: async () => await getServices({ id: user.id }),
  });
  return (
    <div className="mt-2 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-5">
        <h2 className="text-2xl font-bold text-gray-900">My Services</h2>
        <div>
          {!data || data?.data?.length === 0 ? (
            <div> No services found</div>
          ) : isPending ? (
            <div> Loading...</div>
          ) : (
            <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(10em,1fr))] gap-4 divide-x md:mt-0 lg:grid-cols-2 xl:divide-x-0">
              {data?.data?.map((i, index) => (
                <ServiceItem
                  key={i.id + "services"}
                  title={i.attributes.title}
                  description={i.attributes.title}
                  icon={i.attributes.icon}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ServiceItem = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  index: number;
  icon?: string;
}) => {
  return (
    <div
      className={cn(
        index % 2 == 0 && "xl:border-r-2 xl:border-gray-200",
        "flex flex-col items-center p-2 text-center md:p-4",
      )}
    >
      {icon && (
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center rounded-full bg-gray-800 p-2 text-white lg:p-4">
            <DynamicReactIcon name={icon} className="size-14" />
          </div>
        </div>
      )}
      <div>
        <h3 className="text-center text-lg font-medium text-gray-900">
          {title}
        </h3>
        <p className="mt-2 text-gray-500">{description}</p>
      </div>
    </div>
  );
};
