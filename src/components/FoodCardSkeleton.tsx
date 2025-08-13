"use client"

import useWindowSize from "@/hooks/useWindowSize"

export default function FoodCardSkeleton() {

    const { width } = useWindowSize()

    return (<>
        <div className="card skeleton">
            <div className="card-image skeleton"></div>
            <div className="card-header">
                <h3 className="card-title skeleton"></h3>
                <h3 className="card-price skeleton"></h3>
            </div>
            {(width && width > 910) &&
                <>
                    <div className="card-content">
                        <p className="skeleton"></p>
                    </div>
                    <div className="card-metadata skeleton">
                    </div>
                </>
            }
        </div>
    </>)
}