"use client"

import "./../app/globals.css"

import { useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import useWindowSize from "@/hooks/useWindowSize"
import useOnClickOutside from "@/hooks/useOnClickOutside"

import { IoMenuOutline, IoClose } from "react-icons/io5"



export default function NavBar() {
    const { width } = useWindowSize()
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    
    const handleTogglePanel = () => {
        setIsPanelOpen((prev) => !prev)
    }

    const closePanel = () => {
        setIsPanelOpen(false)
    }

    const path = usePathname()


    const ref = useRef<HTMLDivElement>(null)
    useOnClickOutside({ref: ref, handler: closePanel})

    const navElements = () => {
        return <>
            <Link href="/" className={`${path === "/" ? "active font-bold" : ""}`}>Home</Link>
            <Link href="/about" className={`${path === "/about" ? "active font-bold" : ""}`}>About Us</Link>
            <Link href="/marketplace" className={`${path === "/market" ? "active font-bold" : ""}`}>Market</Link>
            <Link href="/signIn" className={`${path === "/signIn" ? "active font-bold" : ""}`}>Sign In</Link>
        </>
    }

    return <>
        <nav className="navbar flex gap-12 items-center justify-end">
            <Link href="/" className="logo mr-auto cursor-pointer">Hero Bite</Link>

            {width && width < 910 
            ? (<button className="w-9 h-9" onClick={handleTogglePanel}><IoMenuOutline className="w-full h-full cursor-pointer" /></button>)
            : navElements()
            }
        </nav>
        {width && width < 910 && (
            <div ref={ref} className={`nav-panel fixed top-0 right-0 w-[80%] h-full z-[1] transition-transform duration-300 ease-out transform flex items-center justify-start flex-col gap-8 ${isPanelOpen ? "translate-x-0" : "translate-x-full"}`}>
                <button className="w-9 h-9 absolute right-8 top-[18px]" onClick={handleTogglePanel}><IoClose className="w-full h-full cursor-pointer" /></button>
                {navElements()}
            </div>
        )}
    </>
}