import { create } from "zustand";
export type TAuthDialogType =
  | "login"
  | "register"
  | "forgot-pwd"
  | "otp"
  | "select-user";
interface State {
  type: TAuthDialogType;
  setType: (type: TAuthDialogType) => void;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  userType: "merchant" | "customer";
  setUserType: (userType: "merchant" | "customer") => void;
}

export const useCurrentAuthDialog = create<State>((set) => ({
  type: "login",
  setType: (type: TAuthDialogType) => set({ type }),
  dialogOpen: false,
  setDialogOpen: (open: boolean) => set({ dialogOpen: open }),
  userType: "customer",
  setUserType: (userType: "merchant" | "customer") => set({ userType }),
}));
