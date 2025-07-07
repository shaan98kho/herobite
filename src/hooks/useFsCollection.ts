import { useQuery } from '@tanstack/react-query'
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

        const singleData= {
            ...snapshot.data(),
            id: snapshot.id
        } as T

        return singleData
    } else {
        // fetch docs
        const colRef = collection(db, props.collectionName)
        const snapshot = await getDocs(colRef)
        const dataCollection = snapshot.docs?.map(doc => ({
            ...doc.data(),
            id: doc.id
        })) as T[]

        return dataCollection
    }
}