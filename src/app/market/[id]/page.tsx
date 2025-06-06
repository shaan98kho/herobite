"use client"

import { useParams } from "next/navigation"
import Link from "next/link"

import { useFetchSingleFood } from "@/hooks/useFetchSingleFood"

import FoodDetail from "../components/FoodDetail"
import BackButton from "../components/BackButton"

export default function FoodItem() {
    const params = useParams()
    const raw = params.id
  
    if (!raw || Array.isArray(raw)) {
      return <div className="py-5 px-8">Invalid id</div>
    }
    const id = raw
    
    const { data: foodItem, isLoading, isError } = useFetchSingleFood(id)

    if(!foodItem) return <div className="py-5 px-8">There is an error loading food, please refresh and try again</div>
    if(isLoading) return <div className="py-5 px-8">Loading..</div>

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
            reviews={foodItem.reviews}
        />
    </>)
}