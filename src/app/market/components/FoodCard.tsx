"use client"

import { Food } from "@/store/types"
import { FaImages } from "react-icons/fa"


export default function FoodCard({
    title,
    description,
    imgUrl,
    quantity,
    expiryDate,
    createdAt,
    tags,
    unitPrice
}: Food) {
    return (<>
        <div className="card">
            <div className="card-image">{imgUrl ? <img src={imgUrl} alt="food photo"></img> : <FaImages />}</div>
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <h3><span>RM</span>{unitPrice?.toFixed(2)}</h3>
            </div>
            <div className="card-content">
                <p>{description}</p>
            </div>
            <div className="card-metadata">
                {tags?.map(tag => <span key={tag}>{tag}</span>)}
            </div>
        </div>
    </>)
}