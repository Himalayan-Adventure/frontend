/* eslint-disable @next/next/no-img-element */
"use client";
import { LazyMotion, domMax, m } from "framer-motion";
import { useState } from "react";
import { FaChevronRight, FaSearch, FaSort } from "react-icons/fa";
import BlockRendererClient from "../ui/block-renderer-client";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  date: string;
  description: BlocksContent;
  imageUrl: string;
}

const ProjectCard = ({ id, title, date, description, imageUrl }: Project) => {
  return (
    <Link href={`/projects/${id}`}>
      <div className="relative font-poppins">
        <div className="absolute inset-0 -z-10 bg-gray-500 blur-lg"></div>
        <div className="shadow-3xl h-full w-full overflow-hidden rounded-lg bg-white shadow-gray-300">
          <Image
            src={imageUrl}
            alt={title}
            className="h-52 w-full object-cover object-top grayscale"
            width={1000}
            height={1000}
          />
          <div className="space-y-3 p-3 lg:space-y-4 lg:p-5">
            <h3 className="font-medium">{title}</h3>
            <p className="text-xs font-medium text-gray-500">{date}</p>
            <p className="line-clamp-3 text-sm text-gray-600">
              <BlockRendererClient content={description} />
            </p>
            <button className="mt-2 flex w-full items-center justify-center space-x-1 text-xs text-primary hover:underline">
              <span> Continue Reading</span>
              <FaChevronRight size={8} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Projects({ projectsData }: { projectsData: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Sort by");
  const [showMore, setShowMore] = useState(false);

  const filteredProjects = projectsData
    ?.filter((project) =>
      project?.attributes?.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "Date") {
        return (
          new Date(a?.attributes?.date).getTime() -
          new Date(b?.attributes?.date).getTime()
        );
      }
      if (sortBy === "Name") {
        return a?.attributes?.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <LazyMotion features={domMax}>
      <m.section
        initial={{ opacity: 0, y: "-10%" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: "some" }}
        transition={{ duration: 0.6 }}
        className="lg:py-16"
      >
        <section className="container p-8 py-8 lg:px-32 lg:py-16">
          <div className="text-center text-lg font-[600] uppercase md:text-2xl lg:text-[40px]">
            <h2>Our Projects</h2>
            <div className="mt-3 flex justify-center lg:mt-6">
              <div className="h-1 w-40 rounded-xl bg-black" />
            </div>
          </div>

          {/* Conditional Rendering */}
          {!projectsData ? (
            <div className="mt-8 text-center text-gray-500">
              <p>Loading projects...</p>
            </div>
          ) : projectsData.length === 0 ? (
            <div className="mt-8 text-center text-gray-500">
              <p>No projects found.</p>
            </div>
          ) : (
            <>
              {/* Search and Sort Controls */}
              <div className="mb-4 mt-6 hidden justify-end gap-2 md:flex">
                {/* Search */}
                <div className="flex items-center rounded-md border border-gray-400 p-2">
                  <FaSearch className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="ml-2 outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Sort By */}
                <div className="flex items-center rounded-md border border-gray-800 p-2">
                  <FaSort className="text-gray-600" />
                  <select
                    className="ml-2 text-sm font-medium outline-none md:text-base"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option>Sort by</option>
                    <option>Date</option>
                    <option>Name</option>
                  </select>
                </div>
              </div>

              {/* Display Message if No Results */}
              {filteredProjects?.length === 0 ? (
                <div className="mt-8 text-center text-gray-500">
                  <p>No projects match your search query.</p>
                </div>
              ) : (
                <>
                  {/* Projects Grid */}
                  <div className="mt-8 grid grid-cols-1 gap-8 md:hidden md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-24">
                    {filteredProjects
                      ?.slice(0, showMore ? filteredProjects.length : 2)
                      ?.map((project, index) => (
                        <ProjectCard
                          key={index}
                          id={project?.id}
                          title={project?.attributes?.title}
                          date={project?.attributes?.date}
                          description={project?.attributes?.about_work}
                          imageUrl={
                            project?.attributes?.package?.data?.attributes
                              ?.image?.data?.[0]?.attributes?.url
                          }
                        />
                      ))}
                  </div>

                  <div className="mt-6 flex md:hidden">
                    <button
                      className="flex items-center space-x-1 text-sm underline"
                      onClick={() => setShowMore(!showMore)}
                    >
                      <span>{showMore ? "Show Less" : "Show More"}</span>{" "}
                      <FaChevronRight
                        size={12}
                        className={`${showMore && "rotate-180"}`}
                      />
                    </button>
                  </div>

                  <div className="mt-8 hidden grid-cols-1 gap-8 md:grid md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-24">
                    {filteredProjects?.map((project, index) => (
                      <ProjectCard
                        key={index}
                        id={project?.id}
                        title={project?.attributes?.title}
                        date={project?.attributes?.date}
                        description={project?.attributes?.about_work}
                        imageUrl={
                          project?.attributes?.package?.data?.attributes?.image
                            ?.data?.[0]?.attributes?.url
                        }
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </m.section>
    </LazyMotion>
  );
}
