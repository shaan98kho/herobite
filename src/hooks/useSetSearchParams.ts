import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"

export function useSetSearchParams() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathName = usePathname()

    return useCallback((updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString())

        for (const [key, value] of Object.entries(updates)) {
            if(value === null) params.delete(key)
                else params.set(key, value)
        }

        const queryString = params.toString()
        const href = queryString ? `${pathName}?${queryString}` : pathName

        router.replace(href);

    }, [searchParams, pathName, router])
}