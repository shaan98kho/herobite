import { useQuery } from '@tanstack/react-query'
import { 
    where,
    query,
    collection,
    getDocs
} from 'firebase/firestore/lite'
import { db } from '@/app/lib/firebase'
import { Food } from '@/store/types'

const foodCollectionRef = collection(db, "foodListing")
interface FetchFieldProps {
    fieldName: string,
    value: string
}

async function fetchFoodByField(){
    // const q = query(foodCollectionRef, where(fieldName
    //     , '==', id))
    
}