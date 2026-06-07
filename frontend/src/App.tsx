import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";
import { router } from "@/routes/router";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { ThemeProvider } from "@/theme/ThemeContext";

export const App: React.FC = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  </ErrorBoundary>
);
