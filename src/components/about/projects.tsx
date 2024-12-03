/* eslint-disable @next/next/no-img-element */
"use client";
import { LazyMotion, domMax, m } from "framer-motion";
import { useState } from "react";
import { FaChevronRight, FaSearch, FaSort } from "react-icons/fa";

interface Project {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}

const ProjectCard = ({ title, date, description, imageUrl }: Project) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-gray-500 blur-lg"></div>
      <div className="shadow-3xl overflow-hidden rounded-lg bg-white shadow-gray-300">
        <img
          src={imageUrl}
          alt={title}
          className="h-52 w-full object-cover grayscale"
        />
        <div className="space-y-3 p-3 lg:space-y-4 lg:p-5">
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs font-medium text-gray-500">{date}</p>
          <p className="line-clamp-3 text-sm text-gray-600">{description}</p>
          <button className="mt-2 flex w-full items-center justify-center space-x-1 text-xs text-primary hover:underline">
            <span> Continue Reading</span>
            <FaChevronRight size={8} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Projects({
  projectsData,
}: {
  projectsData: Project[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Sort by");
  const [showMore, setShowMore] = useState(false);

  const filteredProjects = projectsData
    ?.filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "Date") {
        return new Date(a.date) > new Date(b.date) ? -1 : 1;
      }
      if (sortBy === "Name") {
        return a.title.localeCompare(b.title);
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

          {/* Projects Grid */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:hidden md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-24">
            {filteredProjects
              ?.slice(0, showMore ? filteredProjects.length : 2)
              ?.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  date={project.date}
                  description={project.description}
                  imageUrl={project.imageUrl}
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
                title={project.title}
                date={project.date}
                description={project.description}
                imageUrl={project.imageUrl}
              />
            ))}
          </div>
        </section>
      </m.section>
    </LazyMotion>
  );
}
