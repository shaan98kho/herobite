"use client"

import "./../app/globals.css"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import useWindowSize from "@/hooks/useWindowSize"
import useOnClickOutside from "@/hooks/useOnClickOutside"

import Cart from "./Cart"
import Drawer from "./Drawer"

import { useStore } from "@/store/useStore"

import { IoMenuOutline } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa"
import { LuShoppingBasket } from "react-icons/lu"

export default function NavBar() {
    const { width } = useWindowSize()
    const router = useRouter()
    const currentUser = useStore(s => s.user)
    const signOut = useStore(s => s.logout)
    const cart = useStore(s => s.cartItems)
    const clearExpired = useStore(s => s.clearExpired)

    useEffect(() => {
        clearExpired()
    }, [clearExpired])

    function useToggle(init = false) {
        const [on, setOn] = useState(init)
        const toggle = () => setOn(prev => !prev)
        const off = () => setOn(false)
        return {on, toggle, off}
    }

    const role        = useStore(s => s.user?.role);
    // const authReady   = useStore(s => s.authReady);
    // const hasHydrated = useStore(s => s.hasHydrated);
    // console.log(role, authReady, hasHydrated)

    const navPanel = useToggle()
    const cartPanel = useToggle()

    const path = usePathname()

    const userIcon = currentUser && <button className={`cursor-pointer flex items-center flex-row-reverse gap-[10px] ${width && width > 910 ? "" : ""}`} onClick={signOut}><div className="user-icon"><FaUserCircle /></div><span>{currentUser.name}</span></button>

    const navRef = useRef<HTMLDivElement>(null)
    const cartRef = useRef<HTMLDivElement>(null)
    useOnClickOutside({ref: cartRef, handler: cartPanel.off})
    useOnClickOutside({ref: navRef, handler: navPanel.off})

    const cartItemsCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)

    const navElements = () => {
        return <>
            <Link href="/" className={`${path === "/" ? "active font-bold" : ""}`}>Home</Link>
            <Link href="/about" className={`${path === "/about" ? "active font-bold" : ""}`}>About Us</Link>
            <Link href="/market" className={`${path === "/market" ? "active font-bold" : ""}`}>Market</Link>
            {((width && width < 910) && !currentUser) && <Link href="/auth/signIn" className={`${path === "/auth/signIn" ? "active font-bold" : ""}`}>Sign In</Link>}
        </>
    }

    const restaurantNavEl = () => {
        return <>
        <Link href="/" className={`${path === "/" ? "active font-bold" : ""}`}>Home</Link>
        <Link href="/about" className={`${path === "/about" ? "active font-bold" : ""}`}>About Us</Link>
        <Link href="/dashboard" className={`${path.startsWith("/dashboard") ? "active font-bold" : ""}`}>Dashboard</Link>
        {((width && width < 910) && !currentUser) && <Link href="/auth/signIn" className={`${path === "/auth/signIn" ? "active font-bold" : ""}`}>Sign In</Link>}
    </>
    }

    return <>
        <nav className={`navbar relative`}>
            <Link href="/" className={`logo cursor-pointer leading-[60px] mx-auto flex w-full justify-center items-center ${width && width > 910 ? "pb-4" : ""}`}>Hero Bite</Link>
            <div className="navbar-metadata flex items-center gap-2 absolute">
                {!currentUser && <Link href="/auth/signIn"><FaUserCircle /></Link>}
                {(width && width > 910) && userIcon}
                {role === "customer" && <div className="relative cursor-pointer" onClick={width && width > 460 ? (cartPanel.toggle) : (() => router.push("/cart"))}>
                    {cartItemsCount ? <div className="badge absolute">{cartItemsCount}</div> : ""}
                    <div className="navbar-icon"><LuShoppingBasket /></div>
                </div>}
            </div>
            
            <div className="flex gap-12 items-center justify-center">
                {width && width < 910 
                    ? (<button className="w-9 h-9 absolute top-[19px] left-[16px]" onClick={navPanel.toggle}><IoMenuOutline className="w-full h-full cursor-pointer" /></button>)
                    : (role === "restaurant" ?restaurantNavEl(): navElements() )}
            </div>
            
        </nav>
        {width && width < 910 && (
            <>
                <Drawer 
                    children= {<>{role === "restaurant" ? restaurantNavEl() : navElements()} {userIcon}</>}
                    direction="left"
                    ref={navRef}
                    isOn={navPanel.on}
                    toggle={navPanel.toggle}
                />
            </>
        )}
        
        <Drawer 
            children= {<>
                <Cart />
                <button className="btn" onClick={() => router.push("/cart")}>Check Out</button>
            </>}
            direction="right"
            ref={cartRef}
            isOn={cartPanel.on}
            toggle={cartPanel.toggle}
        />
    </>
}