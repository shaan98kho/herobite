"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useFsCollection } from "@/hooks/useFsCollection"
import { Restaurant as Rstrnt, Food } from "@/store/types"
import FoodCard from "@/components/FoodCard"
import { useMemo } from "react"
import { FaStar } from "react-icons/fa"

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
            return <Link href={`/market/${food.id}`} key={food.id}>
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
        })
    }, [listing])

    if(!restaurant) return <div className="py-5 px-8">Invalid restaurant, please try again!</div>

    return <>
        <div className="py-5 px-8">
            <h2 className="text-2xl">{restaurant.name} <span></span></h2>
            <h3 className="rating flex text-xl items-center gap-2"><FaStar />{restaurant.avgRating}</h3>
            <div className={`card-wrap grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,300px))] items-stretch w-full`}>{restaurantListing}</div>
        </div>
    </>
}