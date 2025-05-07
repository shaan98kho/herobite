"use client"

import { useEffect, useState } from "react"
import useWindowSize from "@/hooks/useWindowSize"
import { Food } from "@/store/types"
import { IoSearch } from "react-icons/io5"

interface SearchProps {
    searchText: string,
    setSearchText: (data: string) => void
}

export default function SearchBar({searchText, setSearchText}: SearchProps) {
    const {width} = useWindowSize()
    const [searchInput, setSearchInput] = useState(searchText)

    useEffect(() => {
        const searchTimeOut = setTimeout(() => setSearchText(searchInput), 500)

        return () => clearTimeout(searchTimeOut)
    }, [searchInput, setSearchText])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchInput(e.target.value)
    }

    return (<>
        <div className="search-panel">
            <IoSearch />
            <input 
                type="text"
                value={searchInput}
                onChange={handleChange}
                placeholder="Search"
                className="px-6"
            />
        </div>
    </>)
}