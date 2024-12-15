"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Input, InputProps } from "./input";
import { Label } from "./label";
import { Button } from "./button";
import { Plus, Trash, X } from "lucide-react";

import { Slider } from "@/components/ui/slider";
import { FormItem, FormLabel } from "./form";

interface MultiInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  showSlider?: boolean;
  placeholder?: string;
}

const MultiInput = React.forwardRef<HTMLInputElement, MultiInputProps>(
  ({ title, showSlider = false, placeholder, ...props }, ref) => {
    const { value } = props;
    console.log(value);
    const [count, setCount] = React.useState<number>(
      value ? value.toString().split("\n").length : 1,
    );
    const initialValue: string[] = Array.from(
      { length: count },
      (_, index) => value?.toString().split("\n")[index] || "",
    );
    value
      ?.toString()
      ?.split("\n")
      ?.map((i) => initialValue.push(i));
    console.log(initialValue);

    const [values, setValues] = React.useState<string[]>(initialValue || [""]);
    React.useEffect(() => {
      setValues([...values, ""]);
    }, [count]);
    return (
      <FormItem className="space-y-3">
        <span className="flex justify-between">
          <FormLabel className="font-poppins">{title}</FormLabel>
          <Button
            className="h-auto rounded-full bg-foreground px-4 py-1"
            onClick={() => setCount(count + 1)}
          >
            <Plus size={16} />
          </Button>
        </span>
        <input className="hidden" type="text" ref={ref} {...props} />
        {Array.from({ length: count }, (_, i) => i).map((i) => (
          <div key={`multi-${title}-${i}`} className="flex flex-col gap-y-3">
            <span className="grid grid-cols-[auto_5%] gap-x-2">
              <Input
                name="value"
                type="text"
                value={values[i]}
                placeholder={placeholder || "Enter"}
              />
              <Button
                className="h-full border border-red-200 bg-red-50 p-1 text-red-900 hover:bg-red-500 hover:text-white"
                onClick={() => setCount(count - 1)}
              >
                <Trash size={16} />
              </Button>
            </span>
            {showSlider && (
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                className="bg-black"
              />
            )}
          </div>
        ))}
      </FormItem>
    );
  },
);
MultiInput.displayName = "MultiInput";

export { MultiInput };
const LegacyMultiInput = ({
  title,
  showSlider = false,
}: {
  title: string;
  showSlider?: boolean;
}) => {
  const [count, setCount] = React.useState<number>(1);
  return (
    <div className="space-y-3">
      <span className="flex justify-between">
        <Label className="font-poppins">{title}</Label>
        <Button
          className="h-auto rounded-full bg-foreground px-4 py-1"
          onClick={() => setCount(count + 1)}
        >
          <Plus size={16} />
        </Button>
      </span>
      {Array.from({ length: count }, (_, i) => i).map((i) => (
        <div key={`multi-${title}-${i}`} className="flex flex-col gap-y-3">
          <span className="grid grid-cols-[30%_auto_5%] gap-x-2">
            <Input name="key" type="text" placeholder="Title" />
            <Input name="value" type="text" placeholder="Description" />
            <Button
              className="h-full border border-red-200 bg-red-50 p-1 text-red-900 hover:bg-red-500 hover:text-white"
              onClick={() => setCount(count - 1)}
            >
              <Trash size={16} />
            </Button>
          </span>
          {showSlider && (
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              className="bg-black"
            />
          )}
        </div>
      ))}
    </div>
  );
};
LegacyMultiInput.displayName = "LegacyMultiInput";
