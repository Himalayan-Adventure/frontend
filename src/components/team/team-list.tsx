"use client";
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

interface Member {
  id: number;
  attributes: {
    designation: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    thumbnail: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    team_categories: {
      data: [
        {
          id: number;
          attributes: {
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            name: string;
          };
        },
      ];
    };
  };
}

interface Category {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    name: string;
    teams: {
      data: {
        id: number;
        attributes: {
          designation: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        };
      }[];
    };
  };
}

interface TeamsListProps {
  teamCategories: Category[];
  members: Member[];
}

export default function TeamsList({ teamCategories, members }: TeamsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Core Team");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (teamCategories?.length > 0) {
      setIsLoading(false);
    }
  }, [teamCategories]);

  const filteredMembers = useMemo(
    () =>
      members?.filter((member) =>
        member?.attributes?.team_categories?.data?.some(
          (category) => category?.attributes?.name === selectedCategory,
        ),
      ),
    [selectedCategory, members],
  );

  return (
    <section className="component-py container relative lg:mt-48">
      {/* Title */}
      <div className="mb-6 mt-8 text-center md:mb-12 md:mt-16">
        <h1 className="font-poppins text-xl font-bold text-gray-800 md:text-2xl lg:text-4xl">
          <span className="border-b-4 border-black pb-1">Our Team</span>
        </h1>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="loader" />
        </div>
      )}

      {/* Category Tabs */}
      {!isLoading && (
        <div className="hide-scrollbar my-8 flex overflow-auto text-nowrap pb-4">
          {teamCategories?.length > 0 ? (
            teamCategories
              .sort((a, b) => a?.id - b?.id)
              .map((team: Category) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedCategory(team?.attributes?.name)}
                  className={`border-r-2 border-gray-700 font-semibold transition-colors last:border-r-0`}
                >
                  <span
                    className={`mx-3 pb-2 md:text-lg lg:text-xl ${
                      selectedCategory === team?.attributes?.name
                        ? "border-b-4 border-primary text-primary"
                        : "border-b-4 border-transparent text-gray-700"
                    }`}
                  >
                    {team?.attributes?.name}
                  </span>
                </button>
              ))
          ) : (
            <p className="text-gray-500">No team categories available</p>
          )}
        </div>
      )}

      {/* Team Members List */}
      {!isLoading && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredMembers?.length > 0 ? (
            filteredMembers?.map((member) => (
              <div key={member.id} className="h-full w-full">
                <Image
                  src={member?.attributes?.thumbnail?.data?.attributes?.url}
                  alt={member?.attributes?.designation}
                  width={500}
                  height={500}
                  className="h-full w-full object-contain"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No members found in this category.</p>
          )}
        </div>
      )}

      {/* Fallback for no team categories or members */}
      {!isLoading && teamCategories?.length === 0 && (
        <p className="mt-8 text-center text-gray-500">
          There are no available team categories to display.
        </p>
      )}

      {!isLoading && members?.length === 0 && (
        <p className="mt-8 text-center text-gray-500">
          No team members available at the moment.
        </p>
      )}
    </section>
  );
}
