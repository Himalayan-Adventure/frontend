"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const AppProgressBar = () => (
  <ProgressBar
    height="4px"
    color="#FD9100"
    options={{ showSpinner: false }}
    shallowRouting
  />
);
