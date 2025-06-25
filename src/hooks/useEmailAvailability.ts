import { fetchSignInMethodsForEmail } from "firebase/auth"
import { auth } from "@/app/lib/firebase"
import { useState } from "react";

export default function useEmailAvailability() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const check = async (email: string) => {
        setLoading(false)
        setError(null)
        try {
            const methods = await fetchSignInMethodsForEmail(auth, email)
            if(methods.length) setError("This email is already taken")
        } catch(e) {
            console.log(e)
            setError("Error verifying emails")
        } finally {
            setLoading(false)
        }
    }

    return {check, loading, error}
}