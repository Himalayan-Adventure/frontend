import { create } from "zustand";
export type TAuthDialogType = "login" | "register" | "forgot-pwd" | "otp";
interface State {
  type: TAuthDialogType;
  setType: (type: TAuthDialogType) => void;
}

export const useCurrentAuthDialog = create<State>((set) => ({
  type: "login",
  setType: (type: TAuthDialogType) => set({ type }),
}));
