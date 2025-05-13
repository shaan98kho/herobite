import { StateCreator } from "zustand"
import { CartItem } from "../types"

export type CartSlice = {
    cart: CartItem | null,
    loading: boolean,
    error: string | null,
    success: boolean,

    addToCart: (id: string) => void,
    removeItemFromCart: (id: string) => void,
    clearExpired: (id: string) => void
}

export const createCartSlice: StateCreator<CartSlice> = (set) => ({
    cart: null,
    loading: false,
    error: null,
    success: false,

    addToCart: (id: string) => {

    },
    removeItemFromCart: (id:string) => {

    },
    clearExpired: (id: string) => {
        
    }
})