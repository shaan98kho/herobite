"use client"

import React from "react";
import { useStore } from "@/store/useStore"
import { useAuthListener } from "@/hooks/useAuthListener"

export default function ClientComponent({children}: {children: React.ReactNode}) {
    useAuthListener()    
    
    return (<>{children}</>)
}