"use client";

import { CartProvider } from "@/contexts/CartContext";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider as ReactWrapBalancerProvider } from "react-wrap-balancer";

type ProviderProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProviderProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false,
      },
      mutations: {
        retry: 2,
      },
    },
    mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _context, mutation) => {
        void queryClient.invalidateQueries({
          queryKey: mutation.options.mutationKey,
        });
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactWrapBalancerProvider>
        <CartProvider>{children}</CartProvider>
      </ReactWrapBalancerProvider>
    </QueryClientProvider>
  );
}
