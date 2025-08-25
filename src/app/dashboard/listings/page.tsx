"use client"

import FoodCard from "@/components/FoodCard"
import { useFsCollection } from "@/hooks/useFsCollection"
import { Restaurant } from "@/store/types"
import { useStore } from "@/store/useStore"

export default function Listings() {
    const res = useStore(s => s.user)
    const id = res?.role === "restaurant" ? res.id : ""
    const {data: restaurant, isLoading, isError, isFetched} = useFsCollection<Restaurant>({
            single: true,
            collectionName: "restaurants",
            id: id!
        }, {enabled: !!id})

    if (!id) return <div className="py-5 px-8">Signing in…</div>;
    if (isLoading) return <div className="py-5 px-8">Loading…</div>;
    if (isError) return <div className="py-5 px-8">Couldn't load restaurant.</div>

    if (isFetched && !restaurant) {
        return <div className="py-5 px-8">Invalid restaurant, please try again!</div>;
    }

    return <div>
        this is Listings
    </div>
}