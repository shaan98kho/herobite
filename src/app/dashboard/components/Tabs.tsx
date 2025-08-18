"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Tabs() {
    const path = usePathname()

    return <>
        <ul className="flex gap-3 items-center text-lg pb-4 justify-center">
            <li className={`cursor-pointer ${path === "/dashboard" ? "active font-bold" : ""}`}>Overview</li>
            <li className={`cursor-pointer ${path === "/revenue" ? "active font-bold" : ""}`}>Revenue</li>
            <li className={`cursor-pointer ${path === "/listings" ? "active font-bold" : ""}`}>Listings</li>
            <li className={`cursor-pointer ${path === "/reviews" ? "active font-bold" : ""}`}>Reviews</li>
        </ul>
    </>
}