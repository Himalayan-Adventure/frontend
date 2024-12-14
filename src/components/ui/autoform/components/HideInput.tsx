import React from "react";
import { Input } from "@/components/ui/input";
import { AutoFormFieldProps } from "@autoform/react";
import { cn } from "@/lib/utils";

export const HideInput: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => (
  <Input
    id={id}
    className={cn("hidden", error ? "border-destructive" : "")}
    {...inputProps}
  />
);
