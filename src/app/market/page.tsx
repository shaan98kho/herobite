"use client"

import React from "react"
import FoodCard from "./components/FoodCard"
import { useFetchFood } from "@/hooks/useFetchFood"

export default function Marketplace() {
    const {data: foods, isLoading, isError} = useFetchFood()

    if(isLoading) return <h2 className="py-5 px-8">Loading</h2>
    if(isError) return <h2 className="py-5 px-8">There was an error loading the listing, please try again.</h2>
    console.log(foods)

    const foodListings = foods?.map((food) => (
        <FoodCard 
            key={food.id}
            restaurantUid={food.restaurantUid}
            id={food.id}
            title={food.title}
            description={food.description}
            quantity={food.quantity}
            expiryDate={food.expiryDate}
            createdAt={food.createdAt}
            tags={food.tags}
            unitPrice={food.unitPrice}
        />
    ))
 
    return (
        <div className="market">
            <div className="search-panel">Search bar here</div>
            <div className="market-bottom">
                <div className="filter-sidebar">Filter sidebar here</div>
                <div className="card-wrap grid grid-cols-3 gap-[10px]">
                    {foodListings}
                </div>
            </div>
        </div>
    )
}