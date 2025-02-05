"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateUsers() {
  revalidateTag("me");
}
