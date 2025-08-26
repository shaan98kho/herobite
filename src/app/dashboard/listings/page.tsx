"use client"
import { useMemo } from "react"
import FoodCard from "@/components/FoodCard"
import { useFsCollection } from "@/hooks/useFsCollection"
import { Restaurant, Food } from "@/store/types"
import { useStore } from "@/store/useStore"

export default function Listings() {
    const res = useStore(s => s.user)
    const id = res?.role === "restaurant" ? res.id : ""
    const {data: restaurant, isLoading, isError, isFetched} = useFsCollection<Restaurant>({
        single: true,
        collectionName: "restaurants",
        id: id!
    }, {enabled: !!id})

    const {data: listing, isLoading: listingLoad, isError: listingErr} = useFsCollection<Food>({
        single: false,
        collectionName:"foodListing",
        whereClause:["restaurantUid", id]
    })

    const restaurantListing = useMemo(() => {
        return listing?.map(food => {
            return <FoodCard 
                restaurantUid={food.restaurantUid}
                id={food.id}
                title={food.title}
                description={food.description}
                tags={food.tags}
                unitPrice={food.unitPrice}
                imgUrl={food.imgUrl}
                quantity={food.quantity}
                key={`${food.id}a`}
            />
        })
    }, [listing])

    if (!id) return <div className="py-5 px-8">Signing in…</div>;
    if (isLoading) return <div className="py-5 px-8">Loading…</div>;
    if (isError) return <div className="py-5 px-8">Couldn't load restaurant.</div>

    if (isFetched && !restaurant) {
        return <div className="py-5 px-8">Invalid restaurant, please try again!</div>;
    }
    

    return <div className={`card-wrap grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] items-stretch w-full`}>
        {restaurantListing}
    </div>
}