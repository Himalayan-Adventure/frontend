import React from "react";
import { Input } from "@/components/ui/input";
import { AutoFormFieldProps } from "@autoform/react";
import { Textarea } from "../../textarea";

export const TextAreaField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => (
  <Textarea
    id={id}
    className={error ? "border-destructive" : ""}
    {...inputProps}
  />
);
