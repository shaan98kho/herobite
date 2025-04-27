"use client"

import useWindowSize from "@/hooks/useWindowSize"

export default function SearchBar() {
    const {width} = useWindowSize()
    return (<>
        <div className="search-panel">Search bar here</div>
    </>)
}