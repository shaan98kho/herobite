import React from "react"
import Link from "next/link"
import { FaGithub, FaLinkedin } from "react-icons/fa"


export default function Footer() {
    return <footer className="flex relative items-start justify-start gap-3 mt-auto">
        <div className="footer-groove absolute top-[-80px] left-0 w-full overflow-hidden leading-[0] rotate-180">
            <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="block w-full h-[80px]">
            <path d="M0,96 C360,160 1080,0 1440,80 L1440,0 L0,0 Z" fill="#ffffff"></path>
            </svg>
        </div>

        <div className="flex-1">
            <Link href="/" className="logo block leading-[48px]">Hero Bite</Link>
            <span className="text-[10px] credits">Developed by <a target="_blank" href="https://www.linkedin.com/in/wen-qi-k-966581138/">Wen Qi</a></span>
            <div className="external-links flex items-center gap-2  pt-8">
                <a target="_blank" href="https://github.com/shaan98kho/makanplus" rel="noopener noreferrer"
                ><FaGithub/></a>
                <a target="_blank" href="https://www.linkedin.com/in/wen-qi-k-966581138/" rel="noopener noreferrer"><FaLinkedin/></a>
            </div>
            <div>

                <p></p>
                <p></p>
            </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        
    </footer>
}