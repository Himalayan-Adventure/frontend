import { Attribute } from "@strapi/strapi";
type DateValue = globalThis.Date | string;
export type TDepartureData = {
  // date: string;
  duration: string | number;
  season: string;
  altitude: string;
  grade: string;
  departure: Array<{ start?: DateValue; end?: DateValue }> | undefined;
};
export type DepartureProps =
  | {
      data: TDepartureData;
      type: "default";
      id?: never;
    }
  | {
      data: TDepartureData;
      type: "card";
      id: any;
    };
