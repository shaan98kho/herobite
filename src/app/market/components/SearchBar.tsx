"use client"

import { useState } from "react"
import useWindowSize from "@/hooks/useWindowSize"
import { IoSearch } from "react-icons/io5"

export default function SearchBar() {
    const {width} = useWindowSize()
    const [searchText, setSearchText] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchText(e.target.value)
    }

    return (<>
        <div className="search-panel">
            <IoSearch />
            <input 
                type="text"
                value={searchText}
                onChange={handleChange}
                placeholder="Search"
                className="px-6"
            />
        </div>
    </>)
}