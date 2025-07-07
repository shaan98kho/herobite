"use client"

import { useParams } from "next/navigation"

import { useFetchSingleFood } from "@/hooks/useFetchSingleFood"
import { useFetchSingleRestaurant } from "@/hooks/useFetchSingleRestaurant"

import FoodDetail from "../components/FoodDetail"
import BackButton from "../components/BackButton"

export default function FoodItem() {
    const params = useParams()
    const raw = params.id
  
    if (!raw || Array.isArray(raw)) {
      return <div className="py-5 px-8">Invalid id</div>
    }
    const id = raw
    
    const { data: foodItem, isLoading: fIsLoading, isError: fIsError } = useFetchSingleFood(id)
    const {data: restaurant, isLoading: rIsLoading, isError: rIsError} = useFetchSingleRestaurant(foodItem?.restaurantUid)

    if(!foodItem || !restaurant) return <div className="py-5 px-8">There is an error loading food, please refresh and try again</div>
    if(fIsLoading) return <div className="py-5 px-8">Loading..</div>

    return (<>
        <BackButton btnText="Back to market" />
        <FoodDetail
            id={foodItem.id}
            title={foodItem.title}
            description={foodItem.description}
            imgUrl={foodItem.imgUrl}
            quantity={foodItem.quantity}
            createdAt={foodItem.createdAt}
            expiryDate={foodItem.expiryDate}
            unitPrice={foodItem.unitPrice}
            tags={foodItem.tags}
            avgRating={restaurant?.avgRating}
            name={restaurant?.name}
            restaurantId={restaurant?.id}
        />
    </>)
}