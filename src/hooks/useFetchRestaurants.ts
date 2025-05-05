import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from '@/app/lib/firebase'
import { Restaurant } from '@/store/types'

const restaurantCollectionRef = collection(db, "restaurants")

async function fetchRestaurants(): Promise<Restaurant[]> {
    const snapshot = await getDocs(restaurantCollectionRef)
    const restaurants = snapshot.docs?.map(doc => ({
        ...doc.data(),
        uid: doc.id
    })) as Restaurant[]

    return restaurants
}

export function useFetchRestaurants() {
    return useQuery<Restaurant[]> ({
        queryKey: ['restaurants'],
        queryFn: fetchRestaurants,
        staleTime: (60 * 1000) * 3, // 3 mins
    })
}