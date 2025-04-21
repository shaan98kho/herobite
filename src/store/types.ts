export interface AuthSignUp {
    email: string,
    password: string,
    name: string,
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
    number?: number,
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
    listingId: string,
    title: string,
    description: string,
    imgUrl: string,
    quantity: number,
    expiryTime: number,
    createdAt: number,
    isActive: boolean,
    tags?: string[]
}

export interface Order {
    orderId: string,
    customerUid: string,
    restaurantUid: string,
    foodItemId: string,
    createdAt: number
}

export interface Review {
    reviewId: string,
    customerUid: string,
    restaurantUid: string,
    foodId: string,
    rating: number,
    comment?: string,
    createdAt: number
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
