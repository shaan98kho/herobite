"use client"

import { useMemo, useState, lazy, Suspense } from "react"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

import FilterPanel from "../components/FilterPanel"
import SearchBar from "../components/SearchBar"
import FoodCard from "./FoodCard"
import FoodCardSkeleton from "../components/FoodCardSkeleton"
import { Filters } from "@/store/types"

import { useFetchFoods } from "@/hooks/useFetchFoods"
import { useSetSearchParams } from "@/hooks/useSetSearchParams"
import useWindowSize from "@/hooks/useWindowSize"

export default function Marketplace() {
    const {data: foods, isLoading, isError} = useFetchFoods()
    const {width} = useWindowSize()
    const [isShowFilter, setIsShowFilter] = useState(false)
    const [searchText, setSearchText] = useState('')

    const setSearchParams = useSetSearchParams()
    const searchParams = useSearchParams()

    const toggleFilter = () => setIsShowFilter(prev => !prev)

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

    const filtered = useMemo(() => {
        if(!searchText) {
            return foods
                ?.filter(food => filters.selected.restaurants.length === 0 || filters.selected.restaurants.every(restaurant => food.restaurantUid?.includes(restaurant)))
                ?.filter(food => filters.selected.tags.length === 0 || filters.selected.tags.every(tag => food.tags?.includes(tag)))
        } else {
            const query= searchText.toLowerCase()
            const results = foods?.filter((food) => food.title.toLowerCase().includes(query))

            return results
        }
    }, [foods, filters, searchText])
    
    // const FoodList = lazy(() => import('./FoodList'))


    if(isError) return <h2 className="py-5 px-8">There was an error loading the listing, please try again.</h2>

    const foodListings = filtered?.map((food) => (
        <Link href={`/market/${food.id}`} key={food.id}>
            <FoodCard 
                restaurantUid={food.restaurantUid}
                id={food.id}
                title={food.title}
                description={food.description}
                tags={food.tags}
                unitPrice={food.unitPrice}
                imgUrl={food.imgUrl}
                quantity={food.quantity}
            />
        </Link>
    ))

    const lazyListings = () => {
        return Array.from({ length: 4 }, (_, i) => (
            <FoodCardSkeleton key={i} />
        ))
    }

    // grid grid-cols-2 md:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-[10px]
 
    return (
        <div className="market">
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
            <div className="market-bottom flex items-start gap-[10px] py-5">
                {width && width > 910
                    ? <FilterPanel 
                            filters={filters}
                            onChangeFilters={setSearchParams}
                        />
                    : <>
                        <button className="btn mb-4" onClick={toggleFilter}>Filter</button>
                        <div className={`filter-wrap ${isShowFilter ? "" : "hidden"}`}>
                            <FilterPanel
                                filters={filters}
                                onChangeFilters={setSearchParams}
                            />
                        </div>
                    </>
                }

                <div className={`card-wrap grid grid-cols-2 md:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-[10px]`}>
                    {isLoading ? lazyListings() : foodListings}
                </div>
            </div>
        </div>
    )
}