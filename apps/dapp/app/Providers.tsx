"use client";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConnectKitProvider } from "connectkit";
import { clientConfig } from "../config/wagmi/wagmi.client";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiProvider config={clientConfig}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>{children}</ConnectKitProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              unstyled: true,
              classNames: {
                toast:
                  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-base border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark p-6 pr-8 transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full bg-main text-black",
                title: "text-sm font-heading",
                description: "text-sm font-base",
                actionButton:
                  "inline-flex h-8 shrink-0 items-center justify-center rounded-base border-2 border-border dark:border-darkBorder bg-white px-3 text-sm font-base text-black ring-offset-white transition-colors disabled:pointer-events-none disabled:opacity-50",
                cancelButton:
                  "inline-flex h-8 shrink-0 items-center justify-center rounded-base border-2 border-border dark:border-darkBorder bg-white px-3 text-sm font-base text-black ring-offset-white transition-colors disabled:pointer-events-none disabled:opacity-50",
                closeButton:
                  "absolute right-2 top-2 rounded-md p-1 text-black text-inherit opacity-0 transition-opacity group-hover:opacity-100",
              },
            }}
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
};
