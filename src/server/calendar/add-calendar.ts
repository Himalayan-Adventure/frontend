"use client";

import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
import {
  CalendarFormSchema,
  TCalendarForm,
} from "@/validators/calendar-validator";
export const addCalendar = async (calendar: TCalendarForm) => {
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
      method: "POST",
      url: "/api/calendars",
      data: calendar,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
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
