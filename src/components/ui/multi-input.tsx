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
  ({ title, showSlider = false, placeholder, onChange, ...props }, ref) => {
    const { value } = props;

    const initialValue = value?.toString()?.split("\n");
    const [values, setValues] = React.useState<string[]>(initialValue || [""]);
    const [count, setCount] = React.useState<number>(
      value ? value.toString().split("\n").length : 1,
    );
    const handleAdd = () => {
      setValues([...values, ""]);
    };
    const handleRemove = (index: number) => {
      const updatedValues = values.filter((_, i) => i !== index);
      setValues(updatedValues);
      handleChange(updatedValues);
    };

    const handleChange = (updatedValues: string[]) => {
      const formatted = updatedValues.join("\n");
      setValues(updatedValues);
      if (onChange) {
        onChange({
          target: { value: formatted },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };
    const handleInputChange = (index: number, inputValue: string) => {
      const updatedValues = values.map((v, i) =>
        i === index ? inputValue : v,
      );
      handleChange(updatedValues);
    };
    // const initialValue: string[] = Array.from(
    //   { length: count },
    //   (_, index) => value?.toString().split("\n")[index] || "",
    // );
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [formattedValue, setFormattedValue] = React.useState<string>(
      value?.toString() || "",
    );

    React.useEffect(() => {
      setFormattedValue(values.join("\n"));
      if (inputRef.current) {
        inputRef.current.value = values.join("\n");
      }
      console.log(value);
    }, [values, ref]);
    return (
      <FormItem className="space-y-3">
        <span className="grid grid-cols-[90%_auto] items-center gap-x-4">
          <FormLabel className="font-poppins">{title}</FormLabel>
          <span
            className="btn-primary h-auto items-center justify-center rounded-full bg-foreground px-4 py-1 transition-all ease-in-out hover:bg-primary cursor-pointer"
            onClick={() => setValues([...values, ""])}
          >
            <Plus size={16} />
          </span>
        </span>
        <input className="hidden" type="text" ref={ref} {...props} />
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-x-2">
            <span className="grid w-full grid-cols-[90%_auto] gap-x-4">
              <Input
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder={placeholder || "Enter value"}
              />
              <Button
                className="h-full border bg-red-50 p-1 text-red-900 hover:bg-red-500 hover:text-white"
                onClick={() => handleRemove(index)}
                type="button"
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
