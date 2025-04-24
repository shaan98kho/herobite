import { useStore } from "@/store/useStore"
import Hero from "@/components/hero"

export default function App() {


    return (
        <>
            <Hero
                caption="Today's Surplus"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non tellus sed magna elementum malesuada. Ut id elit fermentum, vestibulum tellus vel, auctor erat. Cras accumsan orci nec nisi scelerisque dictum."
            />
        </>
    )
}