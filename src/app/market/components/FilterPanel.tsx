"use client"

import { useSearchParams } from "next/navigation"
import { Filters, Restaurant } from "@/store/types"
import { useFsCollection } from "@/hooks/useFsCollection"

interface FilterProps {
    filters: Filters,
    onChangeFilters: (updates: Record<string, string | string[] | null>) => void
}

type FilterKey = keyof Filters["selected"]

export default function FilterPanel({filters, onChangeFilters}: FilterProps) {
    const searchParams = useSearchParams()
    const {available, selected} = filters
    const {restaurants: availableRestaurants, tags: availableTags} = available
    const {restaurants: selectedRestaurants, tags: selectedTags} = selected
    const {data: restaurants, isLoading, isError} = useFsCollection<Restaurant>({
        single: false,
        collectionName: "restaurants"
    })

    const clearFilter = () => onChangeFilters({ restaurants: null, tags: null });

    const toggleFilters = (filterType: FilterKey, value: string) => {
        const current = selected[filterType]

        const newFilters = current.includes(value)
                        ? [...current].filter(item => item !== value)
                        : [...current, value]

        onChangeFilters({[filterType]: newFilters})
    }

    const tagOptions = availableTags.map((tag) => <button className="cursor-pointer filter-option p-1" key={tag} onClick={() => toggleFilters("tags", tag)}>{tag}</button>)
    
    const restaurantOptions = restaurants?.map((restaurant) => <button className="currsor-pointer filter-option p-1" key={restaurant.id} onClick={() => toggleFilters("restaurants", restaurant.id)}>{restaurant.name}</button>)

    return (
        <div className="filter-panel">
            <h3 className="font-bold text-2xl">Filter</h3>
            <button className="btn--secondary cursor-pointer" onClick={clearFilter}>Clear filter</button>
            <h4 className="pt-4 font-bold">Tags</h4>
            <div className="filter-row flex gap-2 flex-wrap">
                {tagOptions}
            </div>
            <h4 className="pt-2 font-bold">Restaurants</h4>
            <div className="filter-row flex gap-2 flex-wrap">
                {restaurantOptions}
            </div>
        </div>
    )
}