import Tabs from "./components/Tabs"
import Hero from "@/components/Hero"

export default function RootLayout({
    children,
}: Readonly<{children: React.ReactNode}>) {
    return <div>
        <Hero 
            caption="Welcome!"
            description={`Revenue made in the last 30 days: 888 MYR !`}
            classesForWrp="wave-shape"
        />
        <Tabs />
        {children}
    </div>
}