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
    imgUrl: string,
    availableQty: number,
    price: number
}

export const createCartSlice: StateCreator<CartSlice> = (set) => ({
    cartItems: {},
    loading: false,
    error: null,
    success: false,

    addToCart: ({id, foodTitle, imgUrl, availableQty, price}: CartProps) => {
        try {
            set(s => {
                const now = Date.now()
                const existing = s.cartItems[id]?.quantity || 0
                console.log(availableQty)
                
                if (existing + 1 > availableQty) {
                    throw new Error("Cannot add more than available stock");
                }
                
                const newItem: CartItem = {
                    foodId: id,
                    quantity: existing + 1,
                    addedAt: now,
                    foodTitle: foodTitle,
                    imgUrl: imgUrl ?? null,
                    price: price
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