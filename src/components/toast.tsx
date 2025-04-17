"use client"

import { useEffect } from "react"

interface ToastProps {
    message: string,
    duration?: number,
    onClose: () => void
}

export default function Toast({message, duration = 3000, onClose}: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    return <div className="toast">
        <div className="toast-msg">
            <p>{message}</p>
        </div>
    </div>
}