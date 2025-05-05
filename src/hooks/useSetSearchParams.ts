import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"

export function useSetSearchParams() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathName = usePathname()

    return useCallback((updates: Record<string, string | string[] | null>) => {
        const params = new URLSearchParams(searchParams.toString())

        for (const [key, value] of Object.entries(updates)) {
            params.delete(key)
            if(value === null) continue
            if(Array.isArray(value)) {
                value.forEach(item => params.append(key, item))
            } else {
                params.set(key, value)
            }
        }

        // const queryString = params.toString()
        // const href = queryString ? `${pathName}?${queryString}` : pathName

        router.replace(`${pathName}?${params.toString()}`)

    }, [searchParams, pathName, router])
}