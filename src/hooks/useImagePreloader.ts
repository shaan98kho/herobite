import { useEffect, useState } from "react";

type ImgStatus = 'error' | 'loading' | 'no-src' | 'loaded'

export function useImagePreloader(src: string | null) {
    const [status, setStatus] = useState<ImgStatus>(src === null ? 'no-src' : 'loading')

    useEffect(() => {
        
        if(!src) return
        let isCurrent = true

        const img = new Image()
        img.src = src

        img.onload = () => isCurrent && setStatus('loaded')
        img.onerror = () => isCurrent && setStatus("error")

        return () => {
            isCurrent = false
        }
    }, [src])

    return status
}