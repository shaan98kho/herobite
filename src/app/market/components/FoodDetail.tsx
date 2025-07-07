"use client"

import { Food, Restaurant } from "@/store/types"

import { useState } from "react"
import { useStore } from "@/store/useStore"

import Link from "next/link"

import { useToggleFavorite } from "@/hooks/useToggleFavorite"

import Toast from "@/components/Toast"
import AddToCartBtn from "./AddToCartBtn"

import { FaImages, FaHeart, FaStar } from "react-icons/fa"

type FoodDetailProps = Omit<Food, "restaurantUid"> 
                        & Pick<Restaurant, "avgRating" | "name" >
                        & { restaurantId: Restaurant["id"] }

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
    avgRating,
    name,
    restaurantId
}: FoodDetailProps) {
    const {isFav, toggleFav, isPending} = useToggleFavorite(id)
    const createdAtDateObj = createdAt.toDate().toISOString().slice(0,16).replace("T"," ")
    const expiryDateObj = expiryDate.toDate().toISOString().slice(0,16).replace("T"," ")
    const currentUser = useStore(s => s.user)
    const [toastMsg, setToastMsg] = useState<string>('')

    const rating = avgRating ? <span className="rating flex items-center gap-1"><FaStar /><span className="text-lg">{avgRating}</span></span> : ""
    
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
                    <div className="detail-title flex justify-between items-start font-bold">
                        <h2>{title}</h2>
                        <h3><span className="pr-1">RM</span>{unitPrice}</h3>
                    </div>
                    <Link href={`/restaurants/${restaurantId}`}><h3 className="detail-heading flex items-center gap-4 text-xl pb-2">{name}{rating}</h3></Link>
                    <h4>Quantity: {quantity}</h4>
                    <p>{description}</p>
                    <div className="flex gap-1 flex-col">
                        <span>Created at: {createdAtDateObj}</span>
                        <span>Expiry date: {expiryDateObj}</span>
                    </div>
                    <div className="flex gap-2 py-4 text-sm">{tags && tags.map((tag,idx)=> <span key={idx}>{tag}</span>)}</div>
                    <AddToCartBtn 
                        foodId={id}
                        quantity={quantity}
                        foodTitle={title}
                        imgUrl={imgUrl}
                        price={unitPrice}
                    />
                </div>
            </div>
        </div>
    </>
    )
}