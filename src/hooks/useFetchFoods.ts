import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from '@/app/lib/firebase'
import { Food } from '@/store/types'

const foodCollectionRef = collection(db, "foodListing")

async function fetchFoods():Promise<Food[]> {
    const snapshot = await getDocs(foodCollectionRef)
    const foods = snapshot.docs?.map(doc => ({
        ...doc.data(),
        id: doc.id
    })) as Food[]

    return foods
}

export function useFetchFoods() {
    return useQuery<Food[]> ({
        queryKey: ['foods'],
        queryFn: fetchFoods,
        staleTime: (60 * 1000) * 3, // 3 minutes
    })
}