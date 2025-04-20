import { create } from "zustand"
import { persist } from "zustand/middleware"

import { BaseUser, Auth } from "../types"
import { auth, db } from "@/app/lib/firebase"

import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut 
} from "firebase/auth"
import { setDoc, doc } from "firebase/firestore/lite"

type AuthSlice = {
    user: BaseUser | null,
    loading: boolean,
    error: string | null,

    //actions
    signUp: (data: Auth) => Promise<void>
    signIn: (data: Auth) => Promise<void>
    signOut: () => Promise<void>
}

export const useAuthStore = create<AuthSlice>()(
    persist(
        (set) => ({
            user: null,
            loading: false,
            error: null,

            // actions
            signUp: async({email, password, name, role})=> {
                set({loading: true, error: null})
                try {
                    const creds = await createUserWithEmailAndPassword(auth, email, password)
                    const user = creds.user
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                        role: role,
                    }

                    await setDoc(doc(db, 'users', user.uid), userData)

                    if(role === "customer") {
                        const customerData = {
                            name: name
                        }

                        await setDoc(doc(db, 'customers', user.uid), customerData)
                    }

                    if(role === "restaurant") {
                        const businessData = {
                            name: name,
                            number: 0,
                            isOpen: false,
                            listingCount: 0,
                            avgRating: 0,
                            socialLinks: {},
                        }

                        await setDoc(doc(db, 'restaurants', user.uid), businessData)
                    }

                }
                catch(e: any) {
                    console.log("Error during registration: ", e.message)

                    set({error: e.message})
                }
            },
            signIn: async({email, password}) => {

            },
            signOut: async() => {
                await signOut(auth)
                set({user:null})
            }
        }),
        {
            name: 'auth-storage',
            partialize:(state) => ({
                user: state.user
            }),
        }
    )
)