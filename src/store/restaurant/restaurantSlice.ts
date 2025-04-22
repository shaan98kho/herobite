import { StateCreator } from "zustand"
import { persist } from "zustand/middleware"

import { Restaurant } from "../types"
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

export type RestaurantSlice = {
    restaurant: Restaurant | null,
    loading: boolean,
    error: string | null,
    success: boolean,

    //actions
    setRestaurantProfile: (c: Restaurant | null) => Promise<void>
    editRestaurantProfile: () => Promise<void>,

}

export const createRestaurantSlice: StateCreator<
    RestaurantSlice,
    [],
    [["zustand/persist", { restaurant: Restaurant | null; }]]
> = persist(
        (set) => ({
            restaurant: null,
            loading: false,
            error: null,
            success: false,

            setRestaurantProfile: async(restaurantInfo) => {
                set({restaurant: restaurantInfo})
            },
            editRestaurantProfile: async() => {

            }
        }),
        {
            name: 'profile-storage',
            partialize: state => ({
                restaurant: state.restaurant,
            }),
        }
)