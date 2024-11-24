"use client";
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function TeamsList({ teams }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Core Team");

  // Filter the teams based on the selected category and search query
  const filteredTeams = teams.data
    .filter((team: any) => team.attributes.category === selectedCategory)
    .map((team: any) => ({
      ...team,
      attributes: {
        ...team.attributes,
        members: team.attributes.members.filter((member: any) =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      },
    }));

  return (
    <section className="component-py container relative lg:mt-48">
      {/* Search Bar and Sort Button */}
      <div className="mb-8 flex justify-center gap-4 md:gap-8">
        {/* Search Bar */}
        <div className="flex w-full items-center rounded-full border border-gray-400 px-2 py-1 sm:w-80 md:w-[28rem] lg:w-[40rem] lg:px-4 lg:py-2">
          <FiSearch size={24} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="ml-2 w-full bg-transparent py-1 outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Title */}
      <div className="mb-6 md:mb-12 mt-8 text-center md:mt-16">
        <h1 className="font-poppins text-xl font-bold text-gray-800 md:text-2xl lg:text-4xl">
          <span className="border-b-4 border-black pb-1">Our Team</span>
        </h1>
      </div>

      {/* Category Tabs */}
      <div className="my-8 flex mb-16 ">
        {teams.data.map((team: any) => (
          <button
            key={team.id}
            onClick={() => setSelectedCategory(team.attributes.category)}
            className={`border-r-2 border-gray-700 font-semibold transition-colors last:border-r-0`}
          >
            <span
              className={`mx-3 pb-2 md:text-lg lg:text-xl ${
                selectedCategory === team.attributes.category
                  ? "border-b-4 border-primary text-primary"
                  : "border-b-4 border-transparent text-gray-700"
              }`}
            >
              {team.attributes.category}
            </span>
          </button>
        ))}
      </div>

      {/* Team Members List */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredTeams.length > 0 ? (
          filteredTeams[0].attributes.members.map(
            (member: any, index: number) => (
              <div key={index}>
                <Image
                  src={member.image.data.attributes.url}
                  alt={member.name}
                  width={500}
                  height={500}
                  className="h-full object-cover"
                />
              </div>
            ),
          )
        ) : (
          <p className="text-center text-gray-500">No members found</p>
        )}
      </div>
    </section>
  );
}
