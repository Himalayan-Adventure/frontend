export type DateValue = globalThis.Date | string;
export type ListItem = {
  type: "list-item";
  children: { type: "text"; text: string }[];
};

export type ListType = {
  type: "list";
  format: "unordered";
  children: ListItem[];
};

export type CostBudgeting = {
  id: number;
  title: string;
  lowest: string;
  highest: string;
  offer_price: string;
  offer_percent: number;
  inclusions: ListType[];
  exclusions: ListType[];
};

export type TDepartureData = {
  duration: string | number;
  season: string;
  altitude: string;
  grade: string;
  departure: Array<{ start?: DateValue; end?: DateValue }> | undefined;
  cost_and_budgeting?: CostBudgeting[];
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
