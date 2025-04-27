"use client"

import { Food } from "@/store/types"

import useWindowSize from "@/hooks/useWindowSize"

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

    const { width } = useWindowSize()

    return (<>
        <div className="card">
            <div className="card-image">{imgUrl ? <img src={imgUrl} alt="food photo"></img> : <FaImages />}</div>
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <h3><span>RM</span>{unitPrice?.toFixed(2)}</h3>
            </div>
            {(width && width > 910) &&
                <div className="card-content">
                    <p>{description}</p>
                </div>}
            <div className="card-metadata">
                {tags?.map(tag => <span key={tag}>{tag}</span>)}
            </div>
        </div>
    </>)
}