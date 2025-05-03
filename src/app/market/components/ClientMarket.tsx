"use client"

import { useMemo, useState } from "react"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

import FilterPanel from "../components/FilterPanel"
import FoodCard from "../components/FoodCard"
import SearchBar from "../components/SearchBar"
import FoodCardSkeleton from "../components/FoodCardSkeleton"
import { Filters } from "@/store/types"

import { useFetchFoods } from "@/hooks/useFetchFoods"
import { useSetSearchParams } from "@/hooks/useSetSearchParams"
import useWindowSize from "@/hooks/useWindowSize"

export default function Marketplace() {
    const {data: foods, isLoading, isError} = useFetchFoods()
    const {width} = useWindowSize()
    const [isShowFilter, setIsShowFilter] = useState(false)

    const setSearchParams = useSetSearchParams()
    const searchParams = useSearchParams()

    const filters: Filters = useMemo(() => {
        const availableRestaurants = Array.from(new Set((foods)?.map((food) => food.restaurantUid)))
        const availableTags = Array.from(new Set((foods)?.flatMap(food => food.tags?? [])))

        return {
            available: {
                restaurants: availableRestaurants,
                tags: availableTags
            },
            selected: {
                restaurants: searchParams.getAll("restaurants"),
                tags: searchParams.getAll("tags")
            }
        }
    }, [foods, searchParams])
    

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
                    ? <FilterPanel 
                            filters={filters}
                            onChangeFilters={setSearchParams}
                        />
                    : <>
                        <button className="btn mb-4">Filter</button>
                        <FilterPanel
                            filters={filters}
                            onChangeFilters={setSearchParams}
                        />
                    </>
                }
                <div className={`card-wrap grid ${width && width<910 ? "grid-cols-2" : "grid-cols-3"} gap-[10px]`}>
                    {isLoading ? lazyListings() : foodListings}
                </div>
            </div>
        </div>
    )
}