import { useQuery } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore/lite'
import { db } from '@/app/lib/firebase'
import { Restaurant } from '@/store/types'

async function fetchSingleRestaurant(id: string):Promise<Restaurant> {
    const docRef = doc(db, "restaurants", id)
    const snapshot = await getDoc(docRef)
    if(!snapshot.exists()) throw new Error('Restaurant not found')
    const restaurant = {
        ...snapshot.data(),
        id: snapshot.id
    } as Restaurant

    return restaurant
}

export function useFetchSingleRestaurant(id?: string) {
    return useQuery<Restaurant>({
        queryKey: ['restaurant', id],
        queryFn: ()=> fetchSingleRestaurant(id!),
        enabled: Boolean(id),
        staleTime: (60 * 1000) * 2,
    })
}