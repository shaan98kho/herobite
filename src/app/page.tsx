"use client"
import { useStore } from "@/store/useStore"
import Hero from "@/components/hero"
import { useRouter } from "next/navigation"

export default function App() {
    const router = useRouter()
    const pushToMarket = () => {
        router.push("/market")
    }


    return (
        <>
            <Hero
                caption="Today's Surplus"
                description="For the time being, please click on User avatar/name to log out."
                action={pushToMarket}
                actionName="Check Out Today's Market"
            />
        </>
    )
}