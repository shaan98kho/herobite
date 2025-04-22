import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "@/app/lib/firebase"
import { doc, getDoc } from "firebase/firestore/lite"
import { useStore } from "@/store/useStore"
import { useEffect } from "react"

export function useAuthListener() {    
    const setCustomerProfile = useStore(state => state.setCustomerProfile)
    const setRestaurantProfile = useStore(state => state.setRestaurantProfile)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (fbUser) => {
            if(fbUser) {
                console.log(fbUser.uid)
            } else {
                setCustomerProfile(null)
            }
        })

        return unsub
    }, [setCustomerProfile, setRestaurantProfile])

}