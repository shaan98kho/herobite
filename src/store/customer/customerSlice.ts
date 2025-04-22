import { StateCreator } from "zustand"
import { persist } from "zustand/middleware"

import { Customer } from "../types"
import { auth, db } from "@/app/lib/firebase"

import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut 
} from "firebase/auth"

import {
    setDoc,
    doc,
    getDoc,
    getDocs } from "firebase/firestore/lite"

export type CustomerSlice = {
    customer: Customer | null,
    loading: boolean,
    error: string | null,
    success: boolean,

    //actions
    setCustomerProfile: (c: Customer | null) => Promise<void>
    editCustomerProfile: () => Promise<void>,
    addFavorites: () => Promise<void>

}

export const createCustomerSlice: StateCreator<
    CustomerSlice,
    [],
    [["zustand/persist", { customer: Customer | null; }]]
> = persist(
        (set) => ({
            customer: null,
            loading: false,
            error: null,
            success: false,

            setCustomerProfile: async(customerInfo) => {
                set({customer: customerInfo})
            },
            editCustomerProfile: async() => {

            },
            addFavorites: async() => {

            }
        }),
        {
            name: 'profile-storage',
            partialize: state => ({
                customer: state.customer,
            }),
        }
)