"use client"
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner"
import ModalContext from "@/contexts/modalContext";
import { Modal } from "./Modal";
import { useState } from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
export default function Providers({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  }))
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ModalContext>
          <Modal />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </ModalContext>
      </QueryClientProvider>
    </>
  )
}
