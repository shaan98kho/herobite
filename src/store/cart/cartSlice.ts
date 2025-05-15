import { StateCreator } from "zustand"
import { CartItem } from "../types"

export type CartSlice = {
    cartItems: Record<string, CartItem>,
    loading: boolean,
    error: string | null,
    success: boolean,

    addToCart: (d: CartProps) => void,
    removeItemFromCart: (id: string) => void,
    clearExpired: (id: string) => void
}

type CartProps = {
    id: string,
    foodTitle: string,
    imgUrl: string
}

export const createCartSlice: StateCreator<CartSlice> = (set) => ({
    cartItems: {},
    loading: false,
    error: null,
    success: false,

    addToCart: ({id, foodTitle, imgUrl}: CartProps) => {
        try {
            set(s => {
                const now = Date.now()
                const existing = s.cartItems[id]?.quantity || 0
                
                const newItem: CartItem = {
                    foodId: id,
                    quantity: existing + 1,
                    addedAt: now,
                    foodTitle: foodTitle,
                    imgUrl: imgUrl ?? null
                }
                return {
                    cartItems: {
                        ...s.cartItems,
                        [id]: newItem}
                }
            })
            set({loading: false, error: null, success: true})
        } catch(e: any) {
            console.log("Error: ", e.message)
            set({error: e.message})
        }
    },
    removeItemFromCart: (id:string) => {
        set(s => {
            const nxt = {...s.cartItems}
            delete nxt[id]

            return {cartItems: nxt}
        })
    },
    clearExpired: (id: string) => {
        
    }
})