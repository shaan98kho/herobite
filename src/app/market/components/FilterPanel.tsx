"use client"

import { useSearchParams } from "next/navigation"

import { Filters } from "@/store/types"

import useWindowSize from "@/hooks/useWindowSize"

interface FilterProps {
    filters: Filters,
    onChangeFilters: (updates: Record<string, string | null>) => void
}

export default function FilterPanel({filters, onChangeFilters}: FilterProps) {
    const searchParams = useSearchParams()

    const selectedFilters = searchParams.getAll("tags")
    // console.log(searchParams.get("tags"))


    const toggleFilter = (tag: string) => {
        // const nextTags = 
        
        // if tag doesnt exist in the current params
        //   add to filter list
        // if already exists
        //   remove it from selected filters

    }

    const clearFilter = () => onChangeFilters({ restaurants: null, tags: null });


    const tagOptions = filters.available.tags.map((tag) => <button className="cursor-pointer filter-option p-1" key={tag} onClick={() => onChangeFilters({tags: tag})}>{tag}</button>)

    return (
        <div className="filter-panel">
            <h3 className="font-bold text-2xl">Filter</h3>
            <button className="btn-alt pb-3 cursor-pointer" onClick={clearFilter}>Clear filter</button>
            <div className="filter-row flex gap-1 flex-wrap">
                {tagOptions}
            </div>


        </div>
    )
}