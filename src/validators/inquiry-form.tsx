"use client";
import * as z from "zod";

import { z as zodInfer } from "zod";
import { ZodProvider } from "@autoform/zod";
import { buildZodFieldConfig, FieldWrapperProps } from "@autoform/react";
import { AutoForm, FieldTypes } from "@/components/ui/autoform";
import { type Value } from "react-phone-number-input";
const fieldConfig = buildZodFieldConfig<
  FieldTypes,
  {
    isImportant?: boolean;
  }
>();

const e164Regex = /^\+[1-9]\d{1,14}$/;
export const InquiryFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .superRefine(
      fieldConfig({
        inputProps: {
          placeholder: "Enter fullname",
        },
      }),
    ),

  phoneNumber: z
    .string()

    .max(10)
    .superRefine(
      fieldConfig({
        fieldType: "phone",
        inputProps: {
          placeholder: "Enter phone number",
        },
      }),
    ),

  email: z
    .string({ required_error: "Email is required" })
    .email()

    .superRefine(
      fieldConfig({
        inputProps: {
          placeholder: "Enter email",
        },
      }),
    ),
  subject: z
    .string({ required_error: "Subject is required" })
    .min(10)
    .superRefine(
      fieldConfig({
        inputProps: {
          placeholder: "Subject",
        },
      }),
    ),

  message: z
    .string({ required_error: "Message is required" })
    .min(10)
    .max(500)

    .superRefine(
      fieldConfig({
        fieldType: "textarea",
        inputProps: {
          placeholder: "Message",
        },
      }),
    ),

  guide: z.coerce.number({ required_error: "Guide is required" }).superRefine(
    fieldConfig({
      fieldWrapper: (props: FieldWrapperProps) => {
        return <></>;
      },
    }),
  ),

  package: z.coerce
    .number()
    .optional()
    .superRefine(
      fieldConfig({
        fieldWrapper: (props: FieldWrapperProps) => {
          return <></>;
        },
      }),
    ),
});

export const InquirySchemaProvider = new ZodProvider(InquiryFormSchema);
export type TInquiryForm = zodInfer.infer<typeof InquiryFormSchema>;
