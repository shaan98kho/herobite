import { useState } from "react"

export default function DropDown({children}: {children: React.ReactNode}) {

    return (
        <div className="drop-down">{children}</div>
    )
}