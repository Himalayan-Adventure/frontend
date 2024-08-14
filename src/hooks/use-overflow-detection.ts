import type { RefObject } from "react";
import { useEffect, useState } from "react";

type OverflowDirection = "left" | "right" | "both" | null;

export const useOverflowDetection = (
  ref: RefObject<HTMLElement>,
): OverflowDirection => {
  const [overflowDirection, setOverflowDirection] =
    useState<OverflowDirection>("left");

  useEffect(() => {
    const checkOverflow = () => {
      if (ref.current) {
        const isOverflowing = ref.current.scrollWidth > ref.current.clientWidth;
        if (isOverflowing) {
          const overflowRight =
            ref.current.scrollLeft <
            ref.current.scrollWidth - ref.current.clientWidth;
          const overflowLeft = ref.current.scrollLeft > 0;
          if (overflowRight && overflowLeft) {
            setOverflowDirection("both");
          } else if (overflowRight) {
            setOverflowDirection("right");
          } else if (overflowLeft) {
            setOverflowDirection("left");
          }
        } else {
          setOverflowDirection(null);
        }
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    ref.current?.addEventListener("scroll", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      ref.current?.removeEventListener("scroll", checkOverflow);
    };
  }, [ref]);

  return overflowDirection;
};
