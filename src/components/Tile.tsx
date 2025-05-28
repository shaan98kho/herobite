"use client"

interface TileProps {
    imgUrl: string,
    title: string,
    description?: string,

}

export default function Tile({imgUrl, title, description}: TileProps) {
    return <>
        <div className="tile">
            <div className="tile-img"></div>
            <div className="tile-desc"></div>
        </div>
    </>
}