"use client"
import Hero from "@/components/Hero"
import { useRouter } from "next/navigation"
import useWindowSize from "@/hooks/useWindowSize"

export default function App() {
    const router = useRouter()
    const pushToMarket = () => {
        router.push("/market")
    }
    // const {width} = useWindowSize()


    return (
        <>
            <Hero
                caption="Save Food, Save Money"
                description="Discover amazing deals on surplus food from local businesses. Reduce waste and enjoy delicious meals at a fraction of the price."
                action={pushToMarket}
                actionName="Check Out Today's Market"
                imgUrl="/assets/hero_banner.jpg"
                classesForBtn="active"
                classesForWrp="text-[#121212]"
                isShowBtn={true}
            />

            {/* <div className={`pt-10 ${width && width > 910 ? "px-[32px]" : "px-[16px]"}`}>
                <h2 className="font-bold text-2xl pb-2">Featured Restaurants</h2>


                <h2 className="font-bold text-2xl pb-2">Explore Various Food</h2>
            </div> */}
        </>
    )
}