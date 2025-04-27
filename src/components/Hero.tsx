"use client"

import { useState } from "react"

interface HeroProps {
    caption: string,
    imgUrl?: string,
    description: string,
    actionName?: string,
    action?: () => void
}

export default function Hero({caption, imgUrl, description, action=() => console.log("Hero action!"), actionName="Button" }: HeroProps) {

    return (
        <div className="hero px-8 py-20">
            <h1 className="hero-title pb-5">{caption}</h1>
            <p className="hero-content pb-16">{description}</p>
            <button className="btn active" onClick={action}>{actionName}</button>
        </div>
    )
}