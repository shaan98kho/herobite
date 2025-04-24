import { StateCreator } from "zustand"

import { Restaurant } from "../types"

export type RestaurantSlice = {
    restaurant: Restaurant | null,
    loading: boolean,
    error: string | null,
    success: boolean,

    //actions
    setRestaurantProfile: (r: Restaurant | null) => Promise<void>,
    // editRestaurantProfile: () => Promise<void>,
}

export const createRestaurantSlice: StateCreator<RestaurantSlice> = (set) => ({
            restaurant: null,
            loading: false,
            error: null,
            success: false,

            setRestaurantProfile: async(restaurantInfo: Restaurant | null) => {
                set({restaurant: restaurantInfo})
            }
        })