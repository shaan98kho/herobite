"use client"
import { useParams } from "next/navigation"
import { useFsCollection } from "@/hooks/useFsCollection"
import { Restaurant as Rstrnt, Food } from "@/store/types"
import { useMemo } from "react"

export default function Restaurant() {
    const {id} = useParams()
    if(!id || Array.isArray(id)) return <div className="py-5 px-8">Invalid id</div>
    const {data: restaurant, isLoading, isError} = useFsCollection<Rstrnt>({
        single: true,
        collectionName: "restaurants",
        id
    })
    const {data: listing, isLoading: listingLoad, isError: listingErr} = useFsCollection<Food>({
        single: false,
        collectionName:"foodListing",
        whereClause:["restaurantUid", id]
    })

    const restaurantListing = useMemo(() => {
        return listing?.map(food => {
            return <div key={food.id}>
                <span>{food.title}</span>
            </div>
        })
    }, [listing])

    if(!restaurant) return <div className="py-5 px-8">Invalid restaurant</div>

    return <>
        <div className="py-5 px-8">
            <h2 className="text-2xl">{restaurant.name}</h2>
            <h3>{restaurant.avgRating}</h3>
            <div className="flex">{restaurantListing}</div>
        </div>
    </>
}