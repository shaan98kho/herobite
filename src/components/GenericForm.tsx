"use client"

import React from "react"
import useWindowSize from "@/hooks/useWindowSize"

interface GenericFormProps {
    onSubmit: (data: any) => void;
    children: React.ReactNode;
}

export default function GenericForm({onSubmit, children}: GenericFormProps) {
    const { width } = useWindowSize()
    const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        onSubmit(e)
      }

    return <form onSubmit={handleSubmit} className={`form p-8 rounded-[12px] mt-8 mb-8 ${width && width < 910 ? "w-[90%]" : "max-w-[450px]"} m-auto`}>
            {children}
        </form>
}