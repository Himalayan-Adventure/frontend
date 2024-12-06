import { create } from "zustand";
export type TGuideDialogType = "details" | "message" | "appointments";
interface State {
  type: TGuideDialogType;
  setType: (type: TGuideDialogType) => void;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

export const useGuideDialog = create<State>((set) => ({
  type: "details",
  setType: (type: TGuideDialogType) => set({ type }),
  dialogOpen: false,
  setDialogOpen: (open: boolean) => set({ dialogOpen: open }),
}));
