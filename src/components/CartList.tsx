"use client"

import { CartItem } from "@/store/types"
import { useStore } from "@/store/useStore"
import { FaRegTrashAlt } from "react-icons/fa"


export default function CartList({
    foodId,
    quantity,
    addedAt,
    imgUrl,
    foodTitle,
    price
}: CartItem) {
    const removeItemFromCart = useStore(s => s.removeItemFromCart)

    const deleteItem = (id: string):void => {
        removeItemFromCart(id)
    }

    return <>
        <div className="cart-item flex w-[100%] pb-4 gap-4 items-start">
            <img src={imgUrl}/>
            <div className="cart-content">
                <h4>{foodTitle}</h4>
                <div>
                    <p>Qty: {quantity}</p>
                    <p><span>RM</span>{price}</p>
                </div>
            </div>
            <button onClick={() => deleteItem(foodId)} className="cursor-pointer cart-delete ml-auto"><FaRegTrashAlt /></button>
        </div>
    </>
}