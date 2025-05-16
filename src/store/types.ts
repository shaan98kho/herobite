import { Timestamp } from "firebase/firestore/lite"

export interface AuthSignUp {
    email: string,
    password: string,
    name: string,
    phone: string,
    role: "customer" | "restaurant"
}

export interface AuthSignIn {
    email: string,
    password: string
}

type Coordinates = {
    lat: number,
    lon: number    
}

export interface BaseUser {
    uid: string,
    email: string,
    name: string,
    address?: string,
    phone?: number,
    role: "customer" | "restaurant"
}

export interface Customer extends BaseUser {
    uid: string,
    favourites?: string[],
    preferences?: string[],
    reviewedItems?: string[],
    orderHistory?: string[],
    locationCoordinates?: Coordinates
}

export interface Restaurant extends BaseUser {
    description?: string,
    uid: string,
    imgUrl?: string,
    isOpen: boolean,
    listingCount: number,
    avgRating: number,
    socialLinks: {
        instagram?: string,
        x?: string
    },
    locationCoordinates: Coordinates
}

export interface Food {
    restaurantUid: string,
    id: string,
    title: string,
    description: string,
    imgUrl?: string,
    quantity: number,
    expiryDate: Timestamp,
    createdAt: Timestamp,
    unitPrice: number,
    tags?: string[]
    reviews?: Review[]
}

export interface Order {
    orderId: string,
    customerUid: string,
    restaurantUid: string,
    foodItemId: string,
    createdAt: Timestamp
}

export interface CartItem {
    foodId: string,
    quantity: number,
    addedAt: number,
    foodTitle: string,
    imgUrl?: string,
    userId?: string,
    price: number
}

export interface Review {
    reviewId: string,
    customerUid: string,
    restaurantUid: string,
    foodId: string,
    rating: number,
    comment?: string,
    createdAt: Timestamp
}

export interface Filters {
    available: {
        restaurants: string[],
        tags: string[],
    },
    selected: {
        restaurants: string[],
        tags: string[]
    },
}

export type HeroBiteState = {
    currentCustomer: Customer | null,
    currentRestaurant: Restaurant | null,
    listings: Food[],
    orders: Order[]
    reviews: Review[]
}

// folder structure notes:
//   /store
//     /auth
//       authSlice.ts        # login/logout & role tracking
//     /customer
//       customerSlice.ts    # Customer profile + actions (favorites, coins…)
//     /restaurant
//       restaurantSlice.ts  # Restaurant profile + actions (listings, refunds…)
//     types.ts              # shared TS interfaces (BaseUser, Customer, Restaurant…)
//     useStore.ts           # stitches together all the slices into one hook
