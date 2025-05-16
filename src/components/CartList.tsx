"use client"

import { CartItem } from "@/store/types"

export default function CartList({
    foodId,
    quantity,
    addedAt,
    imgUrl,
    foodTitle,
    price
}: CartItem) {
    return <>
        <div className="cart-list">
            <img src={imgUrl}/>
            <div className="cart-content">
                <h4>{foodTitle}</h4>
                <div>
                    <p>Qty: {quantity}</p>
                    <p><span>RM</span>{price}</p>
                </div>
            </div>
        </div>
    </>
}