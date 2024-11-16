"use client";

import { Button } from "../ui/button";

export const WorkPagination = () => {
  return (
    <Button
      className="self-center bg-foreground px-8 py-4"
      // onClick={() =>
      //   setLimit((prev) => {
      //     return limit < works.length ? prev + 2 : prev - 2;
      //   })
      //}
    >
      {/*
                               {limit < works.length ? "More..." : "Less..."}
 */}
      Show more
    </Button>
  );
};
