"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import Dropzone from "react-dropzone";
import { toast } from "sonner";

interface ImageInputProps {
  onChange?: (file: Maybe<File>) => void;
  value: Maybe<File>;
  maxSize?: number;
  allowedFileTypes?: (
    | "image/png"
    | "image/jpeg"
    | "image/webp"
    | "image/jpg"
    | "image/tiff"
  )[];
  required?: boolean;
  children?: React.ReactNode;
}

export default function FileDropZone({
  onChange,
  value,
  maxSize = 10 * 1024 * 1024,
  allowedFileTypes = ["image/png", "image/jpeg", "image/webp", "image/jpg"],
  required = false,
  children,
}: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Validates a file
   * @param {File} file - The file to validate
   * @returns {boolean} - Whether the file is valid
   */
  const validateFile = (file: File) => {
    if (file.size > maxSize) {
      toast.error(
        `File ${file.name} is too large. Maximum file size is ${
          maxSize / (1024 * 1024)
        } MB.`,
      );
      return false;
    }
    if (!allowedFileTypes.includes(file.type as any)) {
      toast.error(`File ${file.name} is not a supported file type.`);
      return false;
    }
    return true;
  };

  /**
   * Handles the file select event
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event
   */
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      if (onChange) {
        onChange(file);
      }
    }
  };

  /**
   * Handles the delete click event
   */
  const handleDeleteClick = () => {
    if (onChange) {
      onChange(null);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-4">
        {value ? (
          <div
            key={value instanceof File ? value.name : "image url"}
            className="relative h-[5rem] min-h-[5rem] w-[5rem] max-w-[5rem] overflow-hidden rounded-lg"
            aria-label={`Preview`}
            role="img"
          >
            <img
              src={value instanceof File ? URL.createObjectURL(value) : value}
              alt={`Preview`}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleDeleteClick()}
              className="absolute right-0 top-0 z-[2000] grid h-6 w-6 place-items-center rounded-full bg-red-500 text-white drop-shadow-md"
              aria-label={`Delete`}
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <Dropzone
            noClick
            onDrop={(acceptedFiles) => {
              if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                if (validateFile(file)) {
                  if (onChange) {
                    onChange(file);
                  }
                }
              }
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <label className="w-full" htmlFor="photos">
                  {!children ? (
                    <div
                      role="button"
                      aria-label="upload files"
                      className="cursor-pointer items-center justify-center whitespace-nowrap rounded-lg border border-blue-800 px-4 py-2 text-blue-800 shadow-sm transition-colors hover:bg-gray-100"
                    >
                      Upload Image
                    </div>
                  ) : (
                    children
                  )}
                </label>

                <input {...getInputProps()} />
                <Input
                  id="photos"
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="sr-only w-1/2"
                  onChange={handleFileSelect}
                  required={required}
                />
              </div>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  );
}
