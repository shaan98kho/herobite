"use client"

import { useRouter } from "next/navigation"
import { IoArrowBackOutline } from "react-icons/io5"

interface backButtonProps {
    btnText: string
}

export default function BackButton({btnText}: backButtonProps) {
    const router = useRouter()

    return <button onClick={() => router.back()} className="back btn-alt px-8 pb-1 flex items-center gap-1 cursor-pointer"><IoArrowBackOutline /> {btnText}</button>
}
