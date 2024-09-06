export type TDepartureData = {
  date: string;
  duration: string;
  season: string;
  altitude: string;
  grade: string;
  departure: string;
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
