import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from '@/app/lib/firebase'
import { Food } from '@/store/types'

const foodCollectionRef = collection(db, "foodListing")

async function fetchFood():Promise<Food[]> {
    const snapshot = await getDocs(foodCollectionRef)
    const foods = snapshot.docs?.map(doc => ({
        ...doc.data(),
        id: doc.id
    })) as Food[]

    return foods
}

export function useFetchFood() {
    return useQuery<Food[]> ({
        queryKey: ['foods'],
        queryFn: fetchFood,
        staleTime: (60 * 1000) * 3, // 3 minutes
    })
}