import { APIResponseData } from "@/types/types";
import axios, { AxiosResponse } from "axios";

export async function uploadMedia(data?: File) {
  if (!data) return;

  const formdata = new FormData();
  formdata.append("files", data);

  const res: AxiosResponse<APIResponseData<"plugin::upload.file">[]> =
    await axios({
      method: "POST",
      url: "/api/upload",
      data: formdata,
      withCredentials: true,
    });

  return res.data?.[0].id;
}
