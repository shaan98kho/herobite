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

type AuthSignUpWithoutPhone = Omit<AuthSignUp, "phone">

export type AuthSlice = {
    user: BaseUser | null,
    loading: boolean,
    error: string | null,
    success: boolean,
    authReady: boolean,
    hasHydrated: boolean,

    //actions
    setUser: (data: BaseUser | null) => void,
    signUp: (data: AuthSignUp) => Promise<void>,
    signIn: (data: AuthSignIn) => Promise<any>,
    logout: () => Promise<void>,
    setAuthReady: (v: boolean) => void,
    setHasHydrated: (v: boolean) => void
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
        user: null,
        loading: false,
        error: null,
        success: false,
        authReady: false,
        hasHydrated: false,

        // actions
        setUser: (user: BaseUser | null) => {
            set({user: user})
        },
        signUp: async({email, password, name, role, phone}: AuthSignUp)=> {
            set({loading: true, error: null, success: false})
            try {
                const creds = await createUserWithEmailAndPassword(auth, email, password)
                const user = creds.user
                const userData = {
                    id: user.uid,
                    email: user.email,
                    role: role,
                    name: name
                }

                await setDoc(doc(db, 'users', user.uid), userData)

                if(role === "customer") {
                    const customerData = {
                        name: name,
                        id: user.uid
                    }

                    await setDoc(doc(db, 'customers', user.uid), customerData)
                }

                if(role === "restaurant") {
                    const businessData = {
                        name: name,
                        isOpen: false,
                        listingCount: 0,
                        avgRating: 0,
                        socialLinks: {},
                        id: user.uid
                    }

                    await setDoc(doc(db, 'restaurants', user.uid), businessData)
                }
                set({loading: false, error: null, success: true})

            }
            catch(e: any) {
                console.log("Error during registration: ", e.message)
                if (e.code === 'auth/email-already-in-use') {
                    set({error: 'That email address is already registered.'}) 
                } else set({error: e.message})
            }
            finally{
                set({loading: false})
            }
        },
        signIn: async({email, password}: AuthSignIn) => {
            set({loading: true, error: null, success: false})
            try {
                const creds = await signInWithEmailAndPassword(auth, email, password)

                const user = creds.user
                const userInfo = {
                    id: user.uid,
                    email: user.email,
                }
                set({error: null, success: true})
                return userInfo
            }
            catch(e: any) {
                console.log("Error during sign-in: ", e.message)
                set({error: e.message})
            }
            finally {set({loading: false})}
        },
        logout: async() => {
            await signOut(auth)
            set({user:null, loading: false, error: null, success: false})
        },
        setAuthReady: (isReady) => set({ authReady: isReady }),
        setHasHydrated: (isHydrated) => set({ hasHydrated: isHydrated })
    })