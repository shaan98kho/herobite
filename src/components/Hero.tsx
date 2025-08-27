"use client"

import { useState, ReactNode } from "react"
import Image from "next/image"
import useWindowSize from "@/hooks/useWindowSize"

interface HeroProps {
    caption: string | ReactNode,
    imgUrl?: string,
    description: string | ReactNode,
    actionName?: string,
    action?: () => void,
    classesForWrp?: string,
    classesForContent?: string,
    classesForBtn?: string,
    isShowBtn: boolean
}

export default function Hero({caption, imgUrl, description, action=() => console.log("Hero action!"), actionName="Button", classesForWrp, classesForContent, classesForBtn, isShowBtn }: HeroProps) {
    const {width} = useWindowSize()
    console.log(imgUrl)

    return (
        <div className={`hero px-8 pt-25 pb-25 relative ${width && width > 760 ? "pt-30": "pt-60"} ${classesForWrp ?? ""}`}>
            {imgUrl && <div className="hero-img"><Image 
                src={imgUrl}
                alt="hero image"
                fill
                style={{objectFit: 'cover', zIndex: -1}}

            /></div>}
            <div className={`flex flex-col relative ${width && width > 720 ? "items-center justify-center text-center" : ""} ${classesForContent ?? ""}`}>
                <h1 className="hero-title pb-5">{caption}</h1>
                <p className="hero-content pb-10">{description}</p>
                {isShowBtn ? <button className={`btn ${classesForBtn}`} onClick={action}>{actionName}</button>: ""}
            </div>
            <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-[0] rotate-180">
            <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="block w-full h-[80px]">
            <path d="M0,96 C360,160 1080,0 1440,80 L1440,0 L0,0 Z" fill="#ffffff"></path>
            </svg>
        </div>
        </div>
    )
}