// useStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createAuthSlice } from './auth/authSlice'
import { createCustomerSlice } from './customer/customerSlice'
import { createRestaurantSlice } from './restaurant/restaurantSlice'

export type MyState =
  ReturnType<typeof createAuthSlice> &
  ReturnType<typeof createCustomerSlice> &
  ReturnType<typeof createRestaurantSlice>

export const useStore = create<MyState>()(
  persist(
    (set, get, api) => ({
      // spread in all slices, now *without* slice-level persist
      ...createAuthSlice(set, get, api),
      ...createCustomerSlice(set, get, api),
      ...createRestaurantSlice(set, get, api),
    }),
    {
      name: 'herobite-storage',    // single key
      // choose exactly which bits you want to persist:
      partialize: (state) => ({
        user: state.user,
        customer: state.customer,
        restaurant: state.restaurant,
      }),
    }
  )
)
