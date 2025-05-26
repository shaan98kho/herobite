"use client"
import useWindowSize from "@/hooks/useWindowSize"
import { IoClose } from "react-icons/io5"

interface DrawerProps {
    // title: string,
    children: React.ReactNode,
    direction: string,
    ref: React.RefObject<HTMLDivElement | null>,
    isOn: boolean,
    toggle: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Drawer({children, direction, ref, isOn, toggle}: DrawerProps) {
    const { width } = useWindowSize()

    return (
        <div ref={ref} className={`drawer fixed top-0 ${direction === "left" ? "left-0" : "right-0"} ${width && width > 910 ? "w-[45%]" : "w-[70%]"} h-full z-[1] transition-transform duration-300 ease-out transform hide-scrollbar flex items-center justify-start flex-col gap-8 ${isOn ? "translate-x-0" : (direction === "left" ? "-translate-x-full" : "translate-x-full")}`}>
            <button className="w-9 h-9 absolute right-4 top-[18px]" onClick={toggle}><IoClose className="w-full h-full cursor-pointer" /></button>
            {children}
        </div>
)}
// Type 'void' is not assignable to type 'MouseEventHandler<HTMLButtonElement> | undefined'.