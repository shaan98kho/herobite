export interface Auth {
    email: string,
    password: string,
    name: string,
    role: "customer" | "restaurant"
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
    locationCoordinates?: {
        lat: number,
        lon: number
    }
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
    locationCoordinates?: {
        lat: number,
        lon: number
    }
}

export interface Listing {
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
    listings: Listing[],
    orders: Order[]
    reviews: Review[]
}