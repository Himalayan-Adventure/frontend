"use client";

import axios, { type AxiosError } from "axios";
import { toast } from "sonner";

import {
  CalendarFormSchema,
  TCalendarForm,
} from "@/validators/calendar-validator";
export const editCalendar = async (calendar: TCalendarForm, id: number) => {
  try {
    const validatedFields = CalendarFormSchema.safeParse(calendar);

    if (!validatedFields.success) {
      return {
        error: {
          message:
            validatedFields?.error?.errors?.[0]?.message ||
            "Please check your input fields!",
        },
        status: 400,
      };
    }

    const res = await axios({
      method: "PUT",
      url: `/api/calendars/${id}`,
      data: calendar,
      withCredentials: true,
    });

    return {
      data: res.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    const errorMsg =
      error?.response?.data?.error?.message ||
      "Error" + " | " + error?.response?.data?.error?.path?.[0] ||
      "An error occured";
    toast.error(errorMsg);
    return {
      error: {
        message: errorMsg,
      },
      status: error?.response?.status || 500,
    };
  }
};
