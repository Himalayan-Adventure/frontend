import { getCurrentUserData } from "@/server/auth/get-me";
import { TUser } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  return useQuery<TUser>({
    queryKey: ["me"],
    queryFn: async () => {
      const userData = await getCurrentUserData();
      if (!userData) {
        throw new Error("No user has logged in");
      }
      return userData;
    },
  });
};