"use client";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import packageImg from "/public/images/package1.jpeg";
import { m, domMax, LazyMotion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { APIResponseCollection, APIResponseData } from "@/types/types";
import EverestImg from "/public/images/everest.png";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MessageDialog } from "../services/message-dialog";
import { AdminInquiryDialog } from "./admin-inquiry-dialog";
import { useCurrentUser } from "@/hooks/user-current-user";
import { toast } from "sonner";
import { useState } from "react";
const packages = [
  {
    name: "Expedition Over 8000m",
    image: packageImg,
  },
  {
    name: "Expedition Over 8000m",
    image: packageImg,
  },
  {
    name: "Peak Climbing",
    image: packageImg,
  },
  {
    name: "Trekking",
    image: packageImg,
  },
];

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
            `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-categories?populate[0]=image&fields[0]=name&pagination[page]=1&pagination[pageSize]=4`,
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis.
              </p>
            </div>
          </div>
          {/* Packages Grid */}
          <div className="gri mx-auto mt-8 flex w-fit grid-cols-2 flex-wrap items-stretch justify-center gap-8 lg:mt-16 lg:grid-cols-4 lg:gap-16 [&>div]:flex-1">
            {packages?.data?.map((pkg, index) => (
              <PackageCategoryCard
                data={pkg}
                key={`package-category-${pkg.id}`}
              />
            ))}
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
  const image = data?.attributes?.image?.data?.attributes;
  const { data: user, isLoading } = useCurrentUser();
  const [open, setOpen] = useState(false);
  return (
    <div className="grid place-items-center">
      {image && (
        <Image
          src={image.url}
          alt={image.name}
          className="aspect-[0.65] h-auto max-h-96 w-full rounded-2xl border border-gray-600 object-cover lg:max-h-96 lg:w-auto"
          height={image.height}
          width={image.width}
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
                <Button className="w-auto rounded-full border border-black bg-transparent px-6 py-1 text-xs text-black hover:bg-black hover:text-white md:text-sm lg:px-12 lg:py-2">
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
              className="w-auto rounded-full border border-black bg-transparent !px-2 !py-0.5 text-xs text-black hover:bg-black hover:text-white md:px-6 md:py-1 md:text-sm lg:px-12 lg:py-2"
              onClick={() => toast.error("Please login to inquire")}
            >
              Inquire
            </Button>
          )}
          <Link href={`/packages?key=category&filter=${data.id}`}>
            <Button className="w-auto rounded-full text-xs text-white md:px-6 md:py-1 md:text-sm lg:px-12 lg:py-2">
              View More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
