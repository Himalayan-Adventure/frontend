import bgImage from "/public/images/packagesBanner.png";
import { Suspense } from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
import { PackageCardSkeleton } from "@/components/packagespage/package-card-skeleton";
import { getProjects } from "@/server/projects/get-projects";
import ProjectCard from "./project-card";
import SearchBar from "@/components/ui/search-bar";
import { LoadMorePagination } from "@/components/services/pagination";
import { Banner } from "@/components/ui/banner";

export const metadata: Metadata = {
  title: `Projects | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};
export default async function Packages({
  searchParams,
}: {
  searchParams: {
    key?: string;
    filter?: string;
    operator?: string;
    title?: string;
    limit?: number;
  };
}) {
  const data = await getProjects(searchParams);

  return (
    <section>
      <Banner title="Projects" desc="" bgImage={bgImage} />
      <div className="container relative space-y-10 lg:mt-40">
        <Suspense>
          <div className="flex justify-end [&>div]:w-fit">
            <SearchBar selector="title" className="max-w-48 justify-end" />
          </div>
        </Suspense>
        <Suspense fallback={<PackageCardSkeleton />}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(0,300px))] gap-4">
            {!data || data?.data?.length === 0 ? (
              <span>No projects are available</span>
            ) : (
              data?.data?.map(
                (project, index) =>
                  project.attributes.package && (
                    <Suspense key={index}>
                      <ProjectCard key={index} project={project} />
                    </Suspense>
                  ),
              )
            )}
          </div>
        </Suspense>

        <LoadMorePagination
          className="mt-40"
          disabled={!data || data?.meta?.pagination.total < 8}
        />
      </div>
    </section>
  );
}
