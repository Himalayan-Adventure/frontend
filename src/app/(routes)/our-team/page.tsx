import TeamsList from "@/components/team/team-list";
import CommonBanner from "@/components/ui/common-banner";
import { getMembers } from "@/server/teams/get-members";
import { getTeams } from "@/server/teams/get-team-categories";

import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
export const metadata: Metadata = {
  title: `Our Team | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};
export default async function TeamsPage() {
  const teamCategories = await getTeams();
  const membersList = await getMembers();
  return (
    <main>
      <CommonBanner title="Our Teams" />
      <TeamsList
        teamCategories={teamCategories?.data}
        members={membersList?.data}
      />
    </main>
  );
}
