"use client"

import { CartItem } from "@/store/types"
import { useStore } from "@/store/useStore"
import { FaRegTrashAlt } from "react-icons/fa"
import { useFsCollection } from "@/hooks/useFsCollection"
import { useImagePreloader } from "@/hooks/useImagePreloader"
import { FaImages } from "react-icons/fa"
import { Food } from "@/store/types"

export default function CartList({
    foodId,
    quantity,
    addedAt,
    imgUrl,
    foodTitle,
    price
}: CartItem) {
    const removeItemFromCart = useStore(s => s.removeItemFromCart)
    const reduceItmQty = useStore(s => s.reduceItmQty)
    const increaseItmQty = useStore(s=>s.increaseItmQty)
    const {data:foodItem, isLoading, isError} = useFsCollection<Food>({
        single: true,
        collectionName: "foodListing",
        id: foodId
    })
    const availability = foodItem?.quantity || 0
    const isSoldOut = quantity >= availability
    const imgStatus = useImagePreloader(imgUrl ? imgUrl : null)
    const imgEl = imgStatus === "loading"
                    ? <div className="skeleton"></div>
                    : imgStatus === "no-src"
                                ? <FaImages />
                                : <img src={imgUrl} alt="food photo"/>

    const deleteItem = (id: string):void => {
        removeItemFromCart(id)
    }

    const reduceQty = (id: string):void => {
        reduceItmQty(id)
    }

    const increaseQty = (id: string, availableQty: number):void => {
        increaseItmQty(id, availableQty)
    }
    

    return <>
        <div className="cart-item flex w-[100%] pb-4 gap-4 items-start">
            {imgEl}
            <div className="cart-content">
                <h4>{foodTitle}</h4>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="pr-2">Qty:</span>
                        <button className="btn" onClick={() => reduceQty(foodId)}>-</button>
                            <p>{quantity}</p>
                        <button className={`btn ${isSoldOut ? "disabled" : ""}`} disabled={isSoldOut} onClick={() => increaseQty(foodId, availability)}>+</button>
                    </div>
                    <p><span>RM</span>{price.toFixed(2)}</p>
                </div>
            </div>
            <button onClick={() => deleteItem(foodId)} className="cursor-pointer cart-delete ml-auto"><FaRegTrashAlt /></button>
        </div>
    </>
}