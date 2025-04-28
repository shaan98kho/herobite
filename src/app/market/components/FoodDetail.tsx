"use client"

import { Food } from "@/store/types"
import { FaImages } from "react-icons/fa"

export default function FoodDetail({
    title,
    description,
    imgUrl,
    quantity,
    createdAt,
    expiryDate,
    unitPrice,
    tags,
    reviews
}: Omit<Food, "restaurantUid" | "id">) {
    
    
    return (
        <div className="py-5 px-8">
            <h2>{title}</h2>
            <h3>Price: RM{unitPrice}</h3>
            <h4>Quantity: {quantity}</h4>
            {imgUrl ? <img src={imgUrl}></img> : <FaImages />}
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