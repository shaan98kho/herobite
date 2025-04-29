"use client"

import { useParams } from "next/navigation"
import Link from "next/link"

import { useFetchSingleFood } from "@/hooks/useFetchSingleFood"

import FoodDetail from "../components/FoodDetail"

import { IoArrowBackOutline } from "react-icons/io5"

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
        <Link href=".." className="back px-8 flex items-center gap-1"><IoArrowBackOutline />Back to All Market</Link>
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