"use client"

import CartComponent from "@/components/Cart"
import { useRouter } from "next/navigation"
import { useStore } from "@/store/useStore"

export default function Cart() {
    const router = useRouter()
    const cartItems = useStore(s => s.cartItems)

    const totalPrice = Object.values(cartItems).reduce((sum, item) => sum + item.price, 0)

    return (
        <div className="cart-page px-[16px] py-[12px]">
            <CartComponent />
            <p className="pt-8">Total: <span>{totalPrice.toFixed(2)}</span></p>
            <button className="btn mr-auto my-2 w-[100%]" onClick={() => console.log("checking out!")}>Check Out</button>
        </div>
    )
}