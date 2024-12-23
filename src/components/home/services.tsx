"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { m, domMax, LazyMotion } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { APIResponseCollection, APIResponseData } from "@/types/types";
import { Text } from "../ui/text";
import { Loading } from "../loading";
import { useCurrentUser } from "@/hooks/user-current-user";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MessageDialog } from "@/components/services/message-dialog";
import EverestImg from "/public/images/everest.png";
import { cn } from "@/lib/utils";
import { postRequestService } from "@/server/services/post-request-serivce";
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
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/services?populate=*&pagination[page]=1&pagination[pageSize]=3`,
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis.
              </p>
            </div>
          </div>
          {/* services Grid */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-16">
            {isPending ? (
              <Loading className="col-span-3" />
            ) : isError || !services || services?.data?.length == 0 ? (
              <Text variant="text-md">No services found</Text>
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
  const image = svc?.attributes?.image?.data?.attributes;
  const { data: user, isLoading } = useCurrentUser();
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
        {image && (
          <Image
            src={image.url}
            alt={image.name}
            className="max-h-96 w-full rounded-2xl border border-gray-600 object-cover brightness-75 grayscale transition duration-300 lg:h-80"
            height={image.height}
            width={image.width}
          />
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
          onClick={() => {
            if (!user) {
              toast.error("Please login to book a service");
            }else{
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
