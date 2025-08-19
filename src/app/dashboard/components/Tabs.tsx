"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Tabs() {
    const path = usePathname()

    return <>
        <ul className="tabs flex gap-3 items-center text-lg pb-4 justify-center">
            <Link href="/dashboard" className={`${path === "/dashboard" ? "active font-bold" : ""}`}><li>Overview</li></Link>
            <Link href="/dashboard/revenue" className={`${path === "/revenue" ? "active font-bold" : ""}`}><li>Revenue</li></Link>
            <Link href="/dashboard/listings" className={`${path === "/listings" ? "active font-bold" : ""}`}><li>Listings</li></Link>
            <Link href="/dashboard/reviews" className={`${path === "/reviews" ? "active font-bold" : ""}`}><li>Reviews</li></Link>
        </ul>
    </>
}