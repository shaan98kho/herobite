import { StateCreator } from "zustand"
import { CartItem } from "../types"

export type CartSlice = {
    cartItems: Record<string, CartItem>,
    loading: boolean,
    error: string | null,
    success: boolean,

    addToCart: (d: CartProps) => void,
    removeItemFromCart: (id: string) => void,
    clearExpired: () => void,
    reduceItmQty: (id: string) => void,
    increaseItmQty: (id: string, availableQty: number) => void
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
                
                if (existing + 1 > availableQty) {
                    throw new Error("Cannot add more than available stock")
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
                        [id]: newItem
                    }}
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
    reduceItmQty(id: string) {
        set(s => {
            const existingQty = s.cartItems[id]?.quantity || 0
            const nxtQty = existingQty - 1

            if(nxtQty <= 0) {
                const {[id]: _, ...rest } = s.cartItems
                return {cartItems: rest}
            }
            
            const currentItm: CartItem = {
                ...s.cartItems[id],
                quantity: nxtQty
            }

            return {
                cartItems: {
                    ...s.cartItems,
                    [id]: {...currentItm}
                }
            }

        })
    },
    increaseItmQty(id:string, availableQty: number) {
        set(s => {
            const existingQty = s.cartItems[id]?.quantity || 0
            const nxtQty = existingQty + 1
            
            if(nxtQty > availableQty) {
                throw new Error("Cannot add more than available stock")
            }

            const currentItm: CartItem = {
                ...s.cartItems[id],
                quantity: nxtQty
            }

            return {
                cartItems: {
                    ...s.cartItems,
                    [id]: {...currentItm}
                }
            }
        })
    },
    clearExpired: () => {
        set(s => {
            const expiryTime = 72 * 60 * 60 * 1000
            const now = Date.now()
            const nxt: Record<string, CartItem> = {}
            
            for (const [key, item] of Object.entries(s.cartItems)) {
                if(now - item.addedAt < expiryTime) {
                    nxt[key] = item
                }
            }
            return {cartItems: nxt}
        })
    }
})