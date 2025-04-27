"use client"

import React from "react"
import FilterPanel from "./components/FilterPanel"
import FoodCard from "./components/FoodCard"
import SearchBar from "./components/SearchBar"
import { useFetchFood } from "@/hooks/useFetchFood"
import useWindowSize from "@/hooks/useWindowSize"


export default function Marketplace() {
    const {data: foods, isLoading, isError} = useFetchFood()
    const {width} = useWindowSize()

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
            <SearchBar />
            <div className="market-bottom">
                {width && width > 910
                    ? <FilterPanel />
                    : <button className="btn mb-4">Filter</button>
                }
                <div className={`card-wrap grid ${width && width<910 ? "grid-cols-2" : "grid-cols-3"} gap-[10px]`}>
                    {foodListings}
                </div>
            </div>
        </div>
    )
}