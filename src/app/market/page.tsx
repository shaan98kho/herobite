"use client"

import { Suspense } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import FilterPanel from "./components/FilterPanel"
import FoodCard from "./components/FoodCard"
import SearchBar from "./components/SearchBar"
import LazyFoodCard from "./components/LazyFoodCard"
import FoodCardSkeleton from "./components/FoodCardSkeleton"

import { useFetchFoods } from "@/hooks/useFetchFoods"
import useWindowSize from "@/hooks/useWindowSize"


export default function Marketplace() {
    const {data: foods, isLoading, isError} = useFetchFoods()
    const {width} = useWindowSize()

    if(isError) return <h2 className="py-5 px-8">There was an error loading the listing, please try again.</h2>

    const foodListings = foods?.map((food) => (
        <Link href={`/market/${food.id}`} key={food.id}>
            <FoodCard 
                restaurantUid={food.restaurantUid}
                id={food.id}
                title={food.title}
                description={food.description}
                tags={food.tags}
                unitPrice={food.unitPrice}
            />
        </Link>
    ))

    const lazyListings = () => {
        return Array.from({ length: 4 }, (_, i) => (
            <FoodCardSkeleton key={i} />
        ))
    }
 
    return (
        <div className="market">
            <SearchBar />
            <div className="market-bottom">
                {width && width > 910
                    ? <FilterPanel />
                    : <button className="btn mb-4">Filter</button>
                }
                <div className={`card-wrap grid ${width && width<910 ? "grid-cols-2" : "grid-cols-3"} gap-[10px]`}>
                    {isLoading ? lazyListings() : foodListings}
                </div>
            </div>
        </div>
    )
}