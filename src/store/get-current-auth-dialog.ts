import { create } from "zustand";
export type TAuthDialogType = "login" | "register" | "forgot-pwd" | "otp";
interface State {
  type: TAuthDialogType;
  setType: (type: TAuthDialogType) => void;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

export const useCurrentAuthDialog = create<State>((set) => ({
  type: "login",
  setType: (type: TAuthDialogType) => set({ type }),
  dialogOpen: false,
  setDialogOpen: (open: boolean) => set({ dialogOpen: open }),
}));
