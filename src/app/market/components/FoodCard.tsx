"use client"


import { useState } from "react"

import { Food } from "@/store/types"
import { useStore } from '@/store/useStore'

import useWindowSize from "@/hooks/useWindowSize"
import { useImagePreloader } from "@/hooks/useImagePreloader"

import AddToCartBtn from "./AddToCartBtn"

import { FaImages } from "react-icons/fa"
import { FiLoader } from "react-icons/fi"

export default function FoodCard({
    id,
    title,
    description,
    imgUrl,
    tags,
    unitPrice,
    quantity
}: Omit<Food, "expiryDate" | "createdAt">) {
    const { width } = useWindowSize()
    const imgStatus = useImagePreloader(imgUrl ? imgUrl : null)
    const imgElement = imgStatus === "loading" 
                                ? <div className="card-image skeleton"></div>
                                : imgStatus === "no-src" 
                                            ? <div className="card-image"><FaImages /></div> 
                                            : <div className="card-image"><img src={imgUrl} alt="food photo" className="object-cover "></img></div>

    return (<>
    
        <div className="card cursor-pointer">
            {imgElement}
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <h3 className="card-price"><span>RM</span>{unitPrice?.toFixed(2)}</h3>
            </div>
            {(width && width > 910) &&
                <>
                    <div className="card-content">
                        <p>{description}</p>
                    </div>
                    <div className="card-metadata pt-8">
                        {tags?.map(tag => <span key={tag}>{tag}</span>)}
                    </div>
                </>
            }
            <AddToCartBtn 
                foodId={id}
                quantity={quantity}
                foodTitle={title}
                imgUrl={imgUrl}
                price={unitPrice}
            />
        </div>
    </>)
}