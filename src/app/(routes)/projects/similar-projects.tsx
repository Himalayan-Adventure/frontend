"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { APIResponseCollection } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PackageCardSkeleton } from "@/components/packagespage/package-card-skeleton";
import ProjectCard from "./project-card";

const SimilarProjects = ({ notToInclude }: { notToInclude?: number }) => {
  const { data, isFetching, status, error } = useQuery<
    APIResponseCollection<"api::project.project">
  >({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/projects?fields[0]=title&populate[package][populate][0]=image&populate[package][populate][1]=adventure_specification&filters[id][$ne]=${notToInclude}&pagination[pageSize]=4&pagination[page]=1`,
        );
        return data.data;
      } catch (error) {
        console.error("Error fetching", error);
      }
    },
  });
  if (isFetching) {
    return <PackageCardSkeleton />;
  }
  if (error) {
    return <>No projects found</>;
  }
  return (
    <section className="container py-4 lg:py-8">
      <div>
        <h2 className="mb-6 text-lg font-semibold md:text-xl lg:text-2xl">
          Similar Projects
        </h2>
        <div className="grid w-full gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {data?.data && data.data.length > 0 ? (
            data.data
              ?.slice(0, 4)
              ?.map((project, index) => (
                <ProjectCard key={index} project={project} variant="similar" />
              ))
          ) : (
            <span>No similar projects are available</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default SimilarProjects;
