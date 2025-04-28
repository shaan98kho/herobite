import { useQuery } from '@tanstack/react-query'
import { 
    collection,
    doc,
    getDoc
} from 'firebase/firestore/lite'
import { db } from '@/app/lib/firebase'
import { Food } from '@/store/types'

async function fetchSingleFood(id:string):Promise<Food> {
    const docRef = doc(db, "foodListing", id)
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) throw new Error('Food item not found')
    const food = {
        ...snapshot.data(),
        id: snapshot.id
    } as Food

    return food
}

export function useFetchSingleFood(id?: string) {
    return useQuery<Food>({
        queryKey: ['food', id],
        queryFn: () => fetchSingleFood(id!),
        enabled: Boolean(id),
        staleTime: (60 * 1000) * 3,
    })
}