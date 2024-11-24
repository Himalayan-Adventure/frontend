"use client";
import { getServices } from "@/server/services/get-services";
import { TUserDeep } from "@/types/auth";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { UserRound } from "lucide-react";
import DynamicReactIcon from "../icons/strapi-icon";
export const AboutCard = ({ user }: { user: TUserDeep | null }) => {
  return (
    <div className="rounded-xl bg-white">
      {/* About section */}
      <div className="space-y-2 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="relative w-fit">
            <h1 className="w-fit text-3xl font-bold text-foreground">About</h1>
            <Separator className="h-2 w-auto bg-black" />
          </div>
          <p className="mt-4 text-black">{user?.about.description}</p>
        </div>
      </div>
      {user && <Services user={user} />}
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
        <div className="divide-x-1 mt-12 grid grid-cols-[repeat(auto-fill,minmax(10em,1fr))] gap-4 md:mt-0 md:divide-x-2 lg:grid-cols-2">
          {!data || data.data.length === 0 ? (
            <div> No services found</div>
          ) : isPending ? (
            <div> Loading...</div>
          ) : (
            data?.data.map((i) => (
              <ServiceItem
                key={i.id + "services"}
                title={i.attributes.title}
                description={i.attributes.title}
                icon={i.attributes.icon}
              />
            ))
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
}: {
  title: string;
  description: string;
  icon?: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center">
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
