import React from "react";
import { AutoFormFieldProps } from "@autoform/react";
import { PhoneInput } from "@/components/ui/phone-input";

export const CustomPhoneInput: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  inputProps,
  error,
  id,
}) => (
  <PhoneInput
    defaultCountry="NP"
    initialValueFormat="national"
    placeholder="Enter phone"
    value={value}
    {...inputProps}
  />
);
