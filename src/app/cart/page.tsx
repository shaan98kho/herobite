"use client"

import { useMemo } from "react"
import CartComponent from "@/components/Cart"
import { useRouter } from "next/navigation"
import { useStore } from "@/store/useStore"

export default function Cart() {
    const router = useRouter()
    const cartItems = useStore(s => s.cartItems)

    return (
        <div className="cart-page px-[16px] py-[12px]">
            <CartComponent />
            <button className="btn mr-auto my-8 w-[100%]" onClick={() => console.log("checking out!")}>Check Out</button>
        </div>
    )
}