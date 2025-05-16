"use client"

import { CartItem } from "@/store/types"
import CartList from "./CartList"
import { useStore } from "@/store/useStore"

export default function Cart() {
    const cart = useStore(s => s.cartItems)
    
    
    return <>
        <div className="cart">
            <h3>Shopping Cart</h3>
            
            <div></div>
        </div>
    </>
}