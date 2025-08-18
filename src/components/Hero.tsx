"use client"

import { useState } from "react"
import Image from "next/image"
import useWindowSize from "@/hooks/useWindowSize"

interface HeroProps {
    caption: string,
    imgUrl?: string,
    description: string,
    actionName?: string,
    action?: () => void,
    classes?: string
}

export default function Hero({caption, imgUrl, description, action=() => console.log("Hero action!"), actionName="Button", classes }: HeroProps) {
    const {width} = useWindowSize()
    console.log(imgUrl)

    return (
        <div className={`hero px-8 pt-25 pb-8 relative ${width && width > 760 ? "pt-30": "pt-60"}`}>
            {imgUrl && <div className="hero-img"><Image 
                src={imgUrl}
                alt="hero image"
                fill
                style={{objectFit: 'cover', zIndex: -1}}

            /></div>}
            <div className={`flex flex-col relative ${width && width > 720 ? "items-center justify-center text-center" : ""} ${classes}`}>
                <h1 className="hero-title pb-5">{caption}</h1>
                <p className="hero-content pb-10">{description}</p>
                <button className="btn active" onClick={action}>{actionName}</button>
            </div>
        </div>
    )
}