"use client"

import { useParams } from "next/navigation"

import { useFetchSingleFood } from "@/hooks/useFetchSingleFood"
import { Food } from "@/store/types"

import FoodDetail from "../components/FoodDetail"

export default function FoodItem() {
    const params = useParams()
    const raw = params.id
  
    if (!raw || Array.isArray(raw)) {
      return <div className="py-5 px-8">Invalid id</div>
    }
    const id = raw
    
    
    console.log("food id",id)
    const { data: foodItem, isLoading, isError } = useFetchSingleFood(id)
    console.log("food item", foodItem)

    if(!foodItem) return <div className="py-5 px-8">There is an error loading food, please refresh and try again</div>
    if(isLoading) return <div className="py-5 px-8">Loading..</div>

    return (<>
        <FoodDetail 
            title={foodItem.title}
            description={foodItem.description}
            imgUrl={foodItem.imgUrl}
            quantity={foodItem.quantity}
            createdAt={foodItem.createdAt}
            expiryDate={foodItem.expiryDate}
            unitPrice={foodItem.unitPrice}
            tags={foodItem.tags}
            reviews={foodItem.reviews}
        />
    </>)
}