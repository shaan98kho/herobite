"use client"

import "./../app/globals.css"

import { useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import useWindowSize from "@/hooks/useWindowSize"
import useOnClickOutside from "@/hooks/useOnClickOutside"

import { useStore } from "@/store/useStore"

import { IoMenuOutline, IoClose } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa"
import { LuShoppingBasket } from "react-icons/lu"

export default function NavBar() {
    const { width } = useWindowSize()
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const currentUser = useStore(s => s.user)
    const signOut = useStore(s => s.logout)
    const cart = useStore(s => s.cartItems)
    
    console.log(cart)
    const handleTogglePanel = () => {
        setIsPanelOpen((prev) => !prev)
    }

    const closePanel = () => {
        setIsPanelOpen(false)
    }

    const path = usePathname()

    const userIcon = currentUser && <button className={`cursor-pointer flex items-center flex-row-reverse gap-[10px] ${width && width > 910 ? "" : ""}`} onClick={signOut}><div className="user-icon"><FaUserCircle /></div><span>{currentUser.name}</span></button>

    const ref = useRef<HTMLDivElement>(null)
    useOnClickOutside({ref: ref, handler: closePanel})

    const cartItemsCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)

    const navElements = () => {
        return <>
            <Link href="/" className={`${path === "/" ? "active font-bold" : ""}`}>Home</Link>
            <Link href="/about" className={`${path === "/about" ? "active font-bold" : ""}`}>About Us</Link>
            <Link href="/market" className={`${path === "/market" ? "active font-bold" : ""}`}>Market</Link>
            {((width && width < 910) && !currentUser) && <Link href="/auth/signIn" className={`${path === "/auth/signIn" ? "active font-bold" : ""}`}>Sign In</Link>}
        </>
    }

    return <>
        <nav className={`navbar relative`}>
            <Link href="/" className={`logo cursor-pointer leading-[60px] mx-auto flex w-full justify-center items-center ${width && width > 910 ? "pb-4" : ""}`}>Hero Bite</Link>
            <div className="navbar-metadata flex items-center gap-2 absolute">
                {!currentUser && <Link href="/auth/signIn" className={`${path === "/auth/signIn" ? "active font-bold" : ""}`}>Sign In</Link>}
                {(width && width > 910) && userIcon}
                <div className="relative">
                    {cartItemsCount ? <div className="badge absolute">{cartItemsCount}</div> : ""}
                    <div className="navbar-icon cursor-pointer"><LuShoppingBasket /></div>
                </div>
            </div>
            
            <div className="flex gap-12 items-center justify-center">
                {width && width < 910 
                    ? (<button className="w-9 h-9 absolute top-[19px] left-[16px]" onClick={handleTogglePanel}><IoMenuOutline className="w-full h-full cursor-pointer" /></button>)
                    : navElements()}
            </div>
            
        </nav>
        {width && width < 910 && (
            <div ref={ref} className={`nav-panel fixed top-0 left-0 w-[70%] h-full z-[1] transition-transform duration-300 ease-out transform flex items-center justify-start flex-col gap-8 ${isPanelOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="w-9 h-9 absolute left-4 top-[18px]" onClick={handleTogglePanel}><IoClose className="w-full h-full cursor-pointer" /></button>
                {navElements()}
                {userIcon}
            </div>
        )}
    </>
}