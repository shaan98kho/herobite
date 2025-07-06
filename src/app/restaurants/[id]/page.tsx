"use client"
import { useParams } from "next/navigation"
import { useFetchSingleRestaurant } from "@/hooks/useFetchSingleRestaurant"
import { useFetchFoods } from "@/hooks/useFetchFoods"

export default function Restaurant() {
    const {id} = useParams()
    if(!id || Array.isArray(id)) return <div className="py-5 px-8">Invalid id</div>
    const {data: restaurant, isLoading, isError} = useFetchSingleRestaurant(id)

    if(!restaurant) return <div className="py-5 px-8">Invalid restaurant</div>

    return <>
        <div className="py-5 px-8">
            <h2 className="text-2xl">{restaurant.name}</h2>
            <h3>{restaurant.avgRating}</h3>
        </div>
    </>
}