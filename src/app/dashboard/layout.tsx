import Tabs from "./components/Tabs"
import DashBoardHeroClient from "./components/DashboardHeroClient"

export default function RootLayout({
    children,
}: Readonly<{children: React.ReactNode}>) {
    

    return <div>
        <DashBoardHeroClient />
        <Tabs />
        <div className="container">

            {children}
        </div>
    </div>
}