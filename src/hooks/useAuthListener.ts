import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "@/app/lib/firebase"
import {
    doc,
    getDoc
} from "firebase/firestore/lite"
import { useStore } from "@/store/useStore"
import { BaseUser, Customer, Restaurant } from "@/store/types"
import { useCallback, useEffect } from "react"

export function useAuthListener() {
    const setBaseUser = useStore(state => state.setUser)
    const setCustomerProfile = useStore(state => state.setCustomerProfile)
    const setRestaurantProfile = useStore(state => state.setRestaurantProfile)

    const handleSetUserProfile = useCallback(async (
        collName: "customers" | "restaurants",
        id: string,
    ) => {
        const docRef = doc(db, collName, id)
        const snapshot = await getDoc(docRef)

        if (!snapshot.exists()) return

        const data = snapshot.data()
        console.log(data)

        if(collName === "customers") {
            setCustomerProfile(data as Customer)
        }
        else if(collName === "restaurants") {
            setRestaurantProfile(data as Restaurant)
        }
    }, [setCustomerProfile, setRestaurantProfile])

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (fbUser) => {
            if(fbUser) {
                try {
                    const uid = fbUser.uid
                    const baseDocRef = doc(db, "users", uid)
                    const baseSnap = await getDoc(baseDocRef)
                    const baseData = baseSnap.data()

                    if(!baseData) {
                        console.log("User does not exist")
                        return
                    }
                    setBaseUser(baseData as BaseUser)

                    const userRole = baseData.role    
                    if(userRole === "customer") {
                        handleSetUserProfile("customers", uid)
                    }
                    if(userRole === "restaurant") {
                        handleSetUserProfile("restaurants", uid)
                    }
                }
                catch(e:any) {
                    console.log(e.message)
                }
            } else {
                setBaseUser(null)
                setCustomerProfile(null)
                setRestaurantProfile(null)
            }
        })

        return unsub
    }, [setBaseUser, handleSetUserProfile])
}