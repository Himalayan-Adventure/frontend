"use client";

import {
  EditProfileFormSchema,
  TEditProfileForm,
} from "@/validators/profile-edit-validator";
import axios, { AxiosResponse, type AxiosError } from "axios";
import { uploadMedia } from "../media/add-media";
export const updateUser = async (user: TEditProfileForm, id: number) => {
  try {
    const validatedFields = EditProfileFormSchema.safeParse(user);

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
    const uploadPfp = await uploadMedia(user.profilePicture);
    if (!uploadPfp) {
      return {
        error: {
          message: "Failed to upload pfp",
        },
        status: 500,
      };
    }
    // const data = {
    //   ...user,
    //   profilePicture: uploadPfp,
    //   resume: {
    //     ...user.resume,
    //     education: user.resume.education
    //       ?.split("\n")
    //       .map((i) => ({ education: i })),
    //   },
    // };
    const data = {
      username: "Prajjwal",
      email: "prajjwalt9@gmail.com",
      profilePicture: 329,
      about: {
        facebook: "https://www.reddit.com/r/ranmichael",
        instagram: "https://www.reddit.com/r/all/",
        whatsapp: "https://www.reddit.com/r/all/",
        description:
          "Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Phasellus a est. Vivamus in erat ut urna cursus vestibulum. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Donec venenatis vulputate lorem.\n" +
          "\n" +
          "Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Phasellus blandit leo ut odio. In auctor lobortis lacus. In hac habitasse platea dictumst. Suspendisse potenti.",
      },
      resume: {
        first_name: "Levi",
        last_name: "asthur",
        email: "prajjwalt9@gmail.com",
        phone: "9822015199",
        location: "Sankhamul, nepal",
        portfolio: "https://www.instagram.com/hello_hello/",
        hard_skill: "technical\nsomething\nwhatever",
        technical_skill: "no\nyes\nno\nyes",
        education: [
          { education: "SEE" },
          { education: "+2" },
          { education: "" },
        ],
        interest: "nothing\ninterests\nme",
      },
      contact: {
        phone: "9822015199",
        address: "Sankhamul, nepal",
        birthday: "2024-11-03",
        gender: "other",
        citizenship: "12312312312312312",
        nationality: "nepali",
        religion: "kirant",
        marital_status: "single",
      },
    };
    console.log(data);

    const res = await axios({
      method: "PUT",
      url: `/api/users/${id}`,
      data: data,
      withCredentials: true,
    });
    console.log(res);
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    console.log(error);
    return {
      error: error?.response?.data || { message: "An error occurred!" },
      status: error?.response?.status || 500,
    };
  }
};
