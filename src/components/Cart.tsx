"use client"

import { CartItem } from "@/store/types"
import CartList from "./CartList"
import { useStore } from "@/store/useStore"
import { useMemo } from "react"
import { SiQuantcast } from "react-icons/si"

export default function Cart() {
    const cartItems = useStore(s => s.cartItems)
    
    const cartEl = useMemo(() => {
            return Object.values(cartItems).map(food => {
                console.log(food.quantity)
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
    
    return <>
        <div className="cart w-[100%]">
            <h3 className="text-center pb-8">Cart</h3>
            
            <div>{cartEl}</div>
        </div>
    </>
}