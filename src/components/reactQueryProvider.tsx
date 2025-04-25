"use client"

import React from "react";
import { useStore } from "@/store/useStore"
import { useAuthListener } from "@/hooks/useAuthListener"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function ReactQueryProvider({children}: {children: React.ReactNode}) {
    useAuthListener()    
    
    return <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
}