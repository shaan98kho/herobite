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
    const setAuthReady = useStore(state => state.setAuthReady)

    const handleSetUserProfile = useCallback(async (
        collName: "customers" | "restaurants",
        id: string,
    ) => {
        const docRef = doc(db, collName, id)
        const snapshot = await getDoc(docRef)

        if (!snapshot.exists()) return

        const data = snapshot.data()

        if(collName === "customers") {
            setCustomerProfile(data as Customer)
            setRestaurantProfile(null)
        }
        else if(collName === "restaurants") {
            setRestaurantProfile(data as Restaurant)
            setCustomerProfile(null)
        }
    }, [setCustomerProfile, setRestaurantProfile])

    useEffect(() => {
        let initialized = false

        const unsub = onAuthStateChanged(auth, async (fbUser) => {
            try {
                if(fbUser) {
                    const uid = fbUser.uid
                    const baseDocRef = doc(db, "users", uid)
                    const baseSnap = await getDoc(baseDocRef)
                    const baseData = baseSnap.data()

                    if(!baseData) {
                        console.log("User does not exist")
                        setBaseUser(null)
                        setCustomerProfile(null)
                        setRestaurantProfile(null)
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
                else {
                    setBaseUser(null)
                    setCustomerProfile(null)
                    setRestaurantProfile(null)
                }
            } catch(e:any) {
                console.log(e.message)
            } finally {
                if(!initialized) {
                    setAuthReady(true)
                    initialized = true
                }
            }
        })

        return unsub
    }, [setBaseUser, handleSetUserProfile])
}