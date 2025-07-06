import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import {
    where,
    query,
    collection,
    getDocs,
    doc,
    getDoc
} from 'firebase/firestore/lite'
import { db } from '@/app/lib/firebase'

type MultiFetch = {
    collectionName: string,
    single: false,
    whereClause?: [field:string, value:any]
}

type SingleFetch = {
    collectionName: string,
    single: true,
    id: string,
    whereClause?: never
}

type FsProps = MultiFetch | SingleFetch

export async function useFsCollection<T>(props: FsProps) {
    if(props.single) {
        // fetch single doc
        const docRef = doc(db, props.collectionName, props.id)
        const snapshot = await getDoc(docRef)
        if(!snapshot.exists()) throw new Error('Doc not found')

        const data = {
            ...snapshot.data(),
            
        } as T
    } else {
        // fetch docs
        const colRef = collection(db, props.collectionName)
    }
}