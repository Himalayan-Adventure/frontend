"use client";

import { useSearchParams } from "next/navigation";

import { Loading } from "@/components/loading";
import { Suspense } from "react";
import { SideFilter } from "./filters";
import { useServiceType } from "@/store/get-service-type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getServices } from "@/server/services/get-services";
import { useCurrentUser } from "@/hooks/user-current-user";
import { Text } from "@/components/ui/text";
import { ServiceCard } from "./service-card";
import { LoadMorePagination } from "@/components/services/pagination";
import { getUsers } from "@/server/users/get-users";
import { GuideCard } from "@/components/services/guide-card";
export const ServiceContent = () => {
  const { type, setType } = useServiceType();

  return (
    <div className="flex w-full flex-col gap-5 md:flex-row">
      {type === "packages" && (
        <Suspense>
          <SideFilter />
        </Suspense>
      )}
      {type === "packages" ? (
        <Suspense>
          <ServicesPackages />
        </Suspense>
      ) : (
        <Suspense>
          <ServicesGuides />
        </Suspense>
      )}
    </div>
  );
};

function ServicesGuides() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const limit = Number(searchParams.get("limit"));
  const { data, isPending } = useQuery({
    queryKey: ["guides", name, limit],
    queryFn: async () => {
      const data = await getUsers(
        "merchant",
        searchParams.get("name") || "",
        limit || 20,
      );
      return data;
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className="relative flex w-full flex-col gap-y-5 py-10 md:pl-36">
      <Text variant="text-xl" bold>
        All members
      </Text>

      <div className="grid w-full gap-2 sm:grid-cols-[repeat(auto-fill,minmax(20em,1fr))] md:gap-6 xl:gap-8">
        {!data || isPending ? (
          <Loading className="col-span-full" />
        ) : data?.length === 0 ? (
          <Text
            variant="text-lg"
            className="col-span-full text-center text-shadow-sm"
          >
            No guides are available!
          </Text>
        ) : (
          data?.map((guide, index) => (
            <GuideCard guide={guide} key={`guide-${index}`} />
          ))
        )}
      </div>
      {data && data?.length > 20 && <LoadMorePagination />}
    </div>
  );
}

function ServicesPackages() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const name = searchParams.get("service-name") || undefined;
  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));
  const { data, isPending } = useQuery({
    queryKey: ["services", category, name, page, limit],
    queryFn: async () => {
      const data = await getServices({ category, name, page, limit });
      return data;
    },
    placeholderData: keepPreviousData,
  });
  const { user, isPending: isUserPending } = useCurrentUser();
  return (
    <div className="z-10 w-full space-y-10 py-10">
      <Text variant="text-xl" bold>
        Services
      </Text>
      <div className="grid w-full gap-2 sm:grid-cols-[repeat(auto-fill,minmax(20em,1fr))] md:gap-6 xl:gap-8">
        {isPending || !data ? (
          <Loading className="col-span-full h-40" />
        ) : data?.data?.length === 0 ? (
          <Text variant="text-md" className="col-span-full">
            No services are available!
          </Text>
        ) : (
          data?.data?.map((svc, index) => (
            <ServiceCard data={svc} key={index} userId={user?.id} />
          ))
        )}
      </div>
      {data && data?.meta.pagination.total > 10 && (
        <LoadMorePagination
          title="Continue exploring amazing views"
          disabled={data.meta.pagination.total <= data.meta.pagination.pageSize}
        />
      )}
    </div>
  );
}
