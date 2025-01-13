"use client";
import { useCurrentUser } from "@/hooks/user-current-user";
import { postRequestService } from "@/server/services/post-request-serivce";
import { APIResponseCollection, APIResponseData } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LazyMotion, domMax, m } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";
import { Loading } from "@/components/loading";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
export default function Services() {
  const {
    data: services,
    isPending,
    isError,
  } = useQuery<APIResponseCollection<"api::service.service">>({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/services?pagination[page]=1&pagination[pageSize]=3&fields[0]=title&populate[1]=service_provider&populate[0]=image`,
        );
        if (!res.ok) {
          throw new Error("Error fetching services");
        }
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <LazyMotion features={domMax}>
      <m.section className="py-8 lg:py-16">
        <div className="container">
          {/* Heading */}
          <div className="flex lg:justify-center lg:text-center">
            <div className="lg:max-w-2xl">
              <h1 className="comp-heading">Our Services</h1>
              <p className="comp-subheading mt-2 lg:mt-4">
                Experience seamless adventure planning! From guided treks and
                equipment rentals to transportation and expert consultation, we
                provide everything you need for a safe and unforgettable
                Himalayan journey.
              </p>
            </div>
          </div>
          {/* services Grid */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-16">
            {isPending ? (
              <Loading className="col-span-full" />
            ) : isError || !services || services?.data?.length == 0 ? (
              <Text variant="text-lg" className="col-span-full text-center">
                No services found
              </Text>
            ) : (
              services?.data?.map((svc, index) => (
                <ServiceCard svc={svc} key={`services-${svc.id}`} />
              ))
            )}
          </div>
        </div>
      </m.section>
    </LazyMotion>
  );
}
const ServiceCard = ({
  svc,
}: {
  svc: APIResponseData<"api::service.service">;
}) => {
  //prettier-ignore
  //@ts-ignore
  const smallImage =   svc.attributes.image?.data?.attributes?.formats?.small;
  const fallbackImg = svc?.attributes?.image?.data?.attributes;
  const image = smallImage || fallbackImg;
  const { user, isPending: isLoading } = useCurrentUser();
  const service_provider = svc?.attributes?.service_provider?.data;
  const {
    mutate: requestSerivceMutation,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["request-service"],
    mutationFn: async () => {
      if (user) {
        await postRequestService({ userId: user.id, serviceId: svc.id });
      }
    },
    onSuccess: () => {
      toast.success("Service Request sent successfully");
    },
    onError: (error) => {
      toast.error(
        "Service Request could not be sent " + error.message.toString(),
      );
    },
    retry: 1,
  });
  return (
    <div className="space-y-4 lg:space-y-8">
      <div className="group relative">
        {image ? (
          <Image
            src={image.url}
            alt={image.name}
            className="max-h-96 w-full rounded-2xl border border-gray-600 object-cover brightness-75 grayscale transition duration-300 lg:h-80"
            height={image.height}
            width={image.width}
          />
        ) : (
          <div className="h-full max-h-96 w-full rounded-2xl bg-gray-200 lg:h-80" />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 flex items-end rounded-2xl bg-black bg-opacity-40">
          <h2 className="mb-4 w-full text-center text-base font-semibold text-white md:text-lg lg:text-2xl">
            {svc.attributes.title}
          </h2>
        </div>
      </div>
      <div className="text-center">
        <Button
          className="w-auto rounded-full border border-black bg-transparent px-12 text-sm text-black"
          isLoading={isPending}
          onClick={() => {
            if (!user) {
              toast.error("Please login to book a service");
            } else if (service_provider?.id === user.id) {
              toast.error(
                "You can't request your own service , " +
                  service_provider?.attributes.username,
              );
            } else {
              requestSerivceMutation();
            }
          }}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};
