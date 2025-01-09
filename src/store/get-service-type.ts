import { create } from "zustand";
export type TServiceType = "guides" | "packages";
interface State {
  type: TServiceType;
  setType: (type: TServiceType) => void;
}

export const useServiceType = create<State>((set) => ({
  type: "guides",
  setType: (type: TServiceType) => set({ type }),
}));
