import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";

const logError = (scope: string) => (error: unknown) => {
  // surface every query/mutation failure with full context
  // eslint-disable-next-line no-console
  console.error(`[${scope} error]`, error);
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: logError("query") }),
  mutationCache: new MutationCache({ onError: logError("mutation") }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // don't retry 4xx
        // @ts-expect-error axios error has response
        const status = error?.response?.status as number | undefined;
        if (status && status >= 400 && status < 500) return false;
        return failureCount < 2;
      },
    },
    mutations: {
      retry: false,
    },
  },
});
