"use client"

import React from "react";

export default function ClientComponent({children}: {children: React.ReactNode}) {
    // to wrap react query wrapper later
    return (<>{children}</>)
}