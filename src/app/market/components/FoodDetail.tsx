"use client"

import { Food } from "@/store/types"

import { useStore } from "@/store/useStore"
import { useState } from "react"

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
    const currentUser = useStore(s => s.user)
    const customer = useStore((s) => s.customer)
    
    const isFav = useStore(s =>
        s.user?.role === 'customer'
          ? s.customer?.favourites?.includes(id) ?? false
          : false
      )
    
    return (
        <div className="py-5 px-8">
            {imgUrl 
                ? <div>
                    {isFav ? <FaHeart /> : <FaRegHeart />}
                    <img src={imgUrl}></img>
                  </div>
                : <div>
                    {isFav ? <FaHeart /> : <FaRegHeart />}
                    <FaImages />
                  </div>
            }
            <h2>{title}</h2>
            <h3>Price: RM{unitPrice}</h3>
            <h4>Quantity: {quantity}</h4>
            <p>{description}</p>
            <div>
                <span>Created at: {createdAt.toString()}</span>
                <span>Expiry date: {expiryDate.toString()}</span>
            </div>
            {reviews && reviews.map((review) => {
                return <>
                    <h4>{review.rating}/5</h4>
                    <p>{review.comment}</p>
                </>
            })}
            {tags && tags.map((tag,idx)=> <span key={idx}>{tag}</span>)}
        </div>
    )
}