import TeamsList from "@/components/team/team-list";
import CommonBanner from "@/components/ui/common-banner";

const teams = {
  data: [
    {
      id: 1,
      attributes: {
        category: "Core Team",
        members: [
          {
            name: "Andrey",
            image: {
              data: {
                id: 1,
                attributes: {
                  url: "/images/example1.png",
                },
              },
            },
          },
          {
            name: "Anna",
            image: {
              data: {
                id: 2,
                attributes: {
                  url: "/images/example2.png",
                },
              },
            },
          },
        ],
      },
    },
    {
      id: 2,
      attributes: {
        category: "Marketing",
        members: [
          {
            name: "Stevan",
            image: {
              data: {
                id: 3,
                attributes: {
                  url: "/images/example3.png",
                },
              },
            },
          },
        ],
      },
    },
  ],
};

export default async function TeamsPage() {
  return (
    <main>
      <CommonBanner title="Our Teams" />
      <TeamsList teams={teams} />
    </main>
  );
}
