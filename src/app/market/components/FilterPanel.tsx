"use client"

import { useSearchParams } from "next/navigation"

import { Filters } from "@/store/types"

import useWindowSize from "@/hooks/useWindowSize"

interface FilterProps {
    filters: Filters,
    onChangeFilters: (updates: Record<string, string | null>) => void
}

export default function FilterPanel({filters, onChangeFilters}: FilterProps) {
    return (
        <div className="filter-sidebar">
            <h3>Filter</h3>
            <div>
                
            </div>


        </div>
    )
}