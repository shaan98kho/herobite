import { create, StateCreator } from "zustand"
import { HeroBiteState } from "./types"
import { createAuthSlice, AuthSlice } from './auth/authSlice'

export type MyState = AuthSlice

export const useStore = create<MyState>()((set, get, api) => ({
    ...createAuthSlice(set, get, api)
}))