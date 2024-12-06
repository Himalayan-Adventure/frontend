"use client";

import { useState } from "react";
import { Text } from "../ui/text";

export const ReadMoreCell = ({ message }: { message: string }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <span className="flex flex-wrap items-center">
      {message.length > 30 ? (
        showMore ? (
          <Text variant="text-sm">{message}</Text>
        ) : (
          <Text variant={"text-sm"}>{message.slice(0, 30) + "...."}</Text>
        )
      ) : (
        <Text variant="text-sm">{message}</Text>
      )}
      {message.length > 30 && (
        <Text
          variant="text-sm"
          onClick={() => setShowMore(!showMore)}
          className="cursor-pointer whitespace-nowrap text-blue-500 hover:underline"
        >
          {!showMore ? "Show more" : "Show less"}
        </Text>
      )}
    </span>
  );
};
