import { APIResponseCollection } from "@/types/types";
import axios, { AxiosResponse } from "axios";

export async function uploadMedia(data?: File) {
  if (!data) return;
  try {
    const formdata = new FormData();
    formdata.append("files", data);

    const res: APIResponseCollection<"plugin::upload.file"> = await axios({
      method: "POST",
      url: "/api/upload",
      data: formdata,
      withCredentials: true,
    });
    return res.data?.[0].id;
  } catch (err) {
    console.log(err);
  }
}
