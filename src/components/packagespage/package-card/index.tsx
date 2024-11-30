import React from "react";

import MainPackageCard from "./main-package-card";
import { APIResponseData } from "@/types/types";
import HomePackageCard from "./home-page-package";
import SimilarPackageCard from "./similar-package-card";

export default function PackageCard({
  variant = "default",
  pkg,
}: {
  variant: "home" | "default" | "similar";
  pkg: APIResponseData<"api::package.package">;
}) {
  const props = { pkg };

  const variantsRenderMap = {
    home: () => <HomePackageCard {...props} />,
    default: () => <MainPackageCard {...props} />,
    similar: () => <SimilarPackageCard {...props} />,
  };

  const Card = variantsRenderMap[variant];

  return <Card />;
}
