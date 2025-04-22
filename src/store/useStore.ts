import { create, StateCreator } from "zustand"
import { HeroBiteState } from "./types"
import { createAuthSlice, AuthSlice } from './auth/authSlice'
import { createCustomerSlice, CustomerSlice } from "./customer/customerSlice"
import { createRestaurantSlice, RestaurantSlice } from "./restaurant/restaurantSlice"

export type MyState = AuthSlice & CustomerSlice & RestaurantSlice

export const useStore = create<MyState>()((set, get, api) => ({
    ...createAuthSlice(set, get, api),
    ...createCustomerSlice(set, get, api),
    ...createRestaurantSlice(set, get, api)
}))