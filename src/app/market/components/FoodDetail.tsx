"use client"

import { Food } from "@/store/types"

import { useStore } from "@/store/useStore"
import { useState } from "react"

import { useToggleFavorite } from "@/hooks/useToggleFavorite"

import { FaImages, FaRegHeart, FaHeart } from "react-icons/fa"

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
    
    return (
        <div className="py-5 px-8 flex flex-col gap-2">
            <div className="detail-top">
                {imgUrl 
                    ? <div className="detail-img flex items-center">
                        <button onClick={toggleFav} className={`cursor-pointer ${isFav ? "active" : ""}`}><FaHeart/></button>
                        <img src={imgUrl}></img>
                    </div>
                    : <div className="detail-img flex items-center">
                        <button onClick={toggleFav}  className={`cursor-pointer ${isFav ? "active" : ""}`}><FaHeart /></button>
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
                    <div>
                        <span>Created at: {createdAt.toString()}</span>
                        <span>Expiry date: {expiryDate.toString()}</span>
                    </div>
                    {tags && tags.map((tag,idx)=> <span key={idx}>{tag}</span>)}
                </div>
            </div>
            {reviews && reviews.map((review) => {
                return <>
                    <h4>{review.rating}/5</h4>
                    <p>{review.comment}</p>
                </>
            })}
        </div>
    )
}