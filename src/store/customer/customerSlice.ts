import { StateCreator } from "zustand"

import { Customer } from "../types"

export type CustomerSlice = {
    customer: Customer | null,
    loading: boolean,
    error: string | null,
    success: boolean,

    //actions
    setCustomerProfile: (c: Customer | null) => Promise<void>
    editCustomerProfile: () => Promise<void>,
    addFavorite: (id: string) => Promise<void>
    removeFavorite: (id: string) => Promise<void>
}

export const createCustomerSlice: StateCreator<CustomerSlice> = (set) => ({
            customer: null,
            loading: false,
            error: null,
            success: false,

            setCustomerProfile: async(customerInfo: Customer | null) => {
                set({customer: customerInfo})
            },
            editCustomerProfile: async() => {

            },
            addFavorite: async(id: string) => {
                set(s => ({
                    customer: s.customer 
                            ? { ...s.customer, 
                                favourites: [...s.customer.favourites || [], id] 
                              }
                            : null
                }))
            },
            removeFavorite: async(id: string) => {
                set(s => ({
                    customer: s.customer 
                    ? {...s.customer,
                        favourites: s.customer.favourites ? s.customer.favourites.filter(f => f !== id) : []
                      }
                    : null
                }))
            }
        })