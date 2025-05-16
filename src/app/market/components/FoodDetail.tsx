"use client"

import { Food } from "@/store/types"

import { useState } from "react"
import { useStore } from "@/store/useStore"

import { useToggleFavorite } from "@/hooks/useToggleFavorite"

import Toast from "@/components/Toast"
import AddToCartBtn from "./AddToCartBtn"

import { FaImages, FaHeart } from "react-icons/fa"

export default function FoodDetail({
    id,
    title,
    description,
    imgUrl,
    quantity,
    createdAt,
    expiryDate,
    unitPrice,
    tags,
    reviews
}: Omit<Food, "restaurantUid">) {
    const {isFav, toggleFav, isPending} = useToggleFavorite(id)
    const createdAtDateObj = createdAt.toDate().toISOString().slice(0,16).replace("T"," ")
    const expiryDateObj = expiryDate.toDate().toISOString().slice(0,16).replace("T"," ")
    const currentUser = useStore(s => s.user)
    const [toastMsg, setToastMsg] = useState<string>('')
    
    return (<>
        {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')}/>}
        <div className="py-5 px-8 flex flex-col gap-2">
            <div className="detail-top">
                {imgUrl 
                    ? <div className="detail-img flex items-center">
                        <button onClick={currentUser ? toggleFav : () => setToastMsg('Please login first!')} className={`cursor-pointer ${isFav ? "active" : ""}`}><FaHeart/></button>
                        <img src={imgUrl}></img>
                    </div>
                    : <div className="detail-img flex items-center">
                        <button onClick={currentUser ? toggleFav : () => setToastMsg('Please login first!')}  className={`cursor-pointer ${isFav ? "active" : ""}`}><FaHeart /></button>
                        <FaImages />
                    </div>
                }
                <div className="detail-metadata">
                    <div className="detail-title flex justify-between items-start">
                        <h2>{title}</h2>
                        <h3><span className="pr-1">RM</span>{unitPrice}</h3>
                    </div>
                    <h4>Quantity: {quantity}</h4>
                    <p>{description}</p>
                    <div className="flex gap-1 flex-col">
                        <span>Created at: {createdAtDateObj}</span>
                        <span>Expiry date: {expiryDateObj}</span>
                    </div>
                    <div className="flex gap-2 pt-4">{tags && tags.map((tag,idx)=> <span key={idx}>{tag}</span>)}</div>
                    <AddToCartBtn 
                        foodId={id}
                        quantity={quantity}
                        foodTitle={title}
                        imgUrl={imgUrl}
                        price={unitPrice}
                    />
                </div>
            </div>
            {reviews && reviews.map((review) => {
                return <div>
                    <h4>{review.rating}/5</h4>
                    <p>{review.comment}</p>
                </div>
            })}
        </div>
    </>
    )
}