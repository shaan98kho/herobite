"use client"

import { useMemo } from "react"
import Link from "next/link"

import { useStore } from "@/store/useStore"

import CartList from "./CartList"

export default function Cart() {
    const cartItems = useStore(s => s.cartItems)
    
    const cartEl = useMemo(() => {
            return Object.values(cartItems).map(food => {
                console.log(food.foodId)
                return <CartList 
                    key={food.foodId}
                    foodId={food.foodId}
                    quantity={food.quantity}
                    addedAt={food.addedAt}
                    foodTitle={food.foodTitle}
                    price={food.price}
                    imgUrl={food.imgUrl}
                />
            })
        }, [cartItems])

    const totalPrice = useMemo(() => Object.values(cartItems).reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems])

    return <>
        <div className="cart w-[100%]">
            <h3 className="text-center pb-8 font-bold text-2xl">Cart</h3>
            
            <div>{cartEl.length !== 0 ? cartEl : <span className="text-center flex flex-col justify-center">Your cart is empty!<Link href={"/market"} className="active pt-2">Browse today's market</Link></span>}</div>

            {cartEl.length !== 0 ? <h4 className="pt-8 pl-5 font-bold text-2xl">Total: {totalPrice.toFixed(2)}</h4> : ""}
        </div>
    </>
}