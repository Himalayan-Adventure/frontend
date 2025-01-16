"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { m, domMax, LazyMotion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { APIResponseCollection, APIResponseData } from "@/types/types";
import EverestImg from "/public/images/everest.png";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AdminInquiryDialog } from "./admin-inquiry-dialog";
import { useCurrentUser } from "@/hooks/user-current-user";
import { toast } from "sonner";
import { useState } from "react";
import { Loading } from "@/components/loading";
import { Text } from "../ui/text";
export default function ExplorePackages() {
  const {
    data: packages,
    isPending,
    isError,
  } = useQuery<APIResponseCollection<"api::package-category.package-category">>(
    {
      queryKey: ["package-category"],
      queryFn: async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-categories?populate[0]=image&fields[0]=name&pagination[page]=1&pagination[pageSize]=4&filters[is_popular]=true`,
          );
          if (!res.ok) {
            throw new Error("Error fetching package categories");
          }
          const data = await res.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
    },
  );

  return (
    <LazyMotion features={domMax}>
      <m.section
        className="py-8 lg:py-16"
        initial={{ opacity: 0, y: "-10%" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          {/* Heading */}
          <div className="flex lg:justify-center lg:text-center">
            <div className="lg:max-w-4xl">
              <h1 className="comp-heading">Explore Packages</h1>
              <p className="comp-subheading mt-2 lg:mt-4">
                Embark on thrilling Himalayan adventures! Choose from trekking,
                mountaineering, paragliding, and more. Discover tailored
                packages designed to ignite your spirit of exploration and make
                every journey unforgettable. Adventure awaits—start now!
              </p>
            </div>
          </div>
          {/* Packages Grid */}
          <div className="mx-auto mt-8 flex w-fit flex-wrap items-stretch justify-center gap-8 lg:mt-16 lg:gap-16 [&>div]:flex-1">
            {isPending ? (
              <Loading className="col-span-full" />
            ) : isError || !packages || packages.data.length === 0 ? (
              <Text variant="text-md" className="col-span-full">
                No package categories found
              </Text>
            ) : (
              packages?.data?.map((pkg, index) => (
                <PackageCategoryCard
                  data={pkg}
                  key={`package-category-${pkg.id}`}
                />
              ))
            )}
          </div>
        </div>
      </m.section>
    </LazyMotion>
  );
}
const PackageCategoryCard = ({
  data,
}: {
  data: APIResponseData<"api::package-category.package-category">;
}) => {
  //prettier-ignore
  //@ts-ignore
  const smallImage =   data.attributes.image?.data?.attributes?.formats?.small;
  const fallbackImg = data?.attributes?.image?.data?.attributes;
  const image = smallImage || fallbackImg;
  const { user, isPending } = useCurrentUser();
  const [open, setOpen] = useState(false);
  return (
    <div className="grid place-items-center">
      {image ? (
        <Image
          src={image.url}
          alt={image?.name}
          className="aspect-[0.65] h-auto max-h-96 w-full rounded-2xl border border-gray-600 object-cover lg:max-h-96 lg:w-auto"
          height={image.height}
          width={image.width}
        />
      ) : (
        <Image
          src={EverestImg}
          alt={"fall back image"}
          className="aspect-[0.65] h-auto max-h-96 w-full rounded-2xl border border-gray-600 lg:max-h-96 lg:w-auto object-cover"
          height={400}
          width={400}
        />
      )}
      <div className="py-2 text-center">
        <h2 className="mb-2 text-sm font-semibold md:text-base lg:text-xl">
          {data?.attributes?.name}
        </h2>
        <div className="flex flex-col items-center space-y-3">
          {user ? (
            <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
              <DialogTrigger asChild>
                <Button
                  aria-label="Inquire button"
                  className="w-auto rounded-full border border-black bg-transparent px-6 py-1 text-xs text-black hover:bg-black hover:text-white md:text-sm lg:px-12 lg:py-2"
                >
                  Inquire
                </Button>
              </DialogTrigger>
              <DialogContent
                className={cn(
                  "table-scrollbar max-h-[90vh] overflow-auto rounded-3xl bg-black py-10 font-poppins text-white sm:rounded-3xl lg:py-20",
                )}
              >
                <Image
                  src={EverestImg}
                  alt="Cover image"
                  className="absolute -z-10 h-full w-full object-cover opacity-90"
                />
                <AdminInquiryDialog packageId={data.id} setOpen={setOpen} />
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              aria-label="Not logged in Inquire"
              className="w-auto rounded-full border border-black bg-transparent px-2 py-0.5 text-xs text-black hover:bg-black hover:text-white md:px-6 md:py-1 md:text-sm lg:px-12 lg:py-2"
              onClick={() => toast.error("Please login to inquire")}
            >
              Inquire
            </Button>
          )}
          <Link href={`/packages?key=category&filter=${data.id}`}>
            <Button
              aria-label="view-more"
              className="w-auto rounded-full text-xs text-white md:px-6 md:py-1 md:text-sm lg:px-12 lg:py-2"
            >
              View More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
