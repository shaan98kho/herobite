import { StateCreator } from "zustand"
import { persist } from "zustand/middleware"

import { BaseUser, AuthSignUp, AuthSignIn } from "../types"
import { auth, db } from "@/app/lib/firebase"

import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut 
} from "firebase/auth"
import { setDoc, doc } from "firebase/firestore/lite"

export type AuthSlice = {
    user: BaseUser | null,
    loading: boolean,
    error: string | null,
    success: boolean,

    //actions
    signUp: (data: AuthSignUp) => Promise<void>,
    signIn: (data: AuthSignIn) => Promise<any>,
    signOut: () => Promise<void>
}

export const createAuthSlice: StateCreator<
    AuthSlice,
    [],
    [["zustand/persist", { user: BaseUser | null; }]]
> = persist(
    (set) => ({
        user: null,
        loading: false,
        error: null,
        success: false,

        // actions
        signUp: async({email, password, name, role})=> {
            set({loading: true, error: null, success: false})
            try {
                const creds = await createUserWithEmailAndPassword(auth, email, password)
                const user = creds.user
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    role: role,
                    name: name
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
                set({loading: false, error: null, success: true})

            }
            catch(e: any) {
                console.log("Error during registration: ", e.message)
                set({error: e.message})
            }
        },
        signIn: async({email, password}) => {
            set({loading: true, error: null, success: false})
            try {
                const creds = await signInWithEmailAndPassword(auth, email, password)

                const user = creds.user
                const userInfo = {
                    uid: user.uid,
                    email: user.email,
                }
                set({loading: false, error: null, success: true})
                return userInfo
            }
            catch(e: any) {
                console.log("Error during sign-in: ", e.message)
                set({error: e.message})
            }
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
