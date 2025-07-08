import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query'
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
    op?:
        | '==' 
        | '<' 
        | '<=' 
        | '>' 
        | '>=' 
        | 'array-contains' 
        | 'in' 
        | 'array-contains-any',
}

type SingleFetch = {
    collectionName: string,
    single: true,
    id: string,
    whereClause?: never,
    op?: never

}

type FsProps = MultiFetch | SingleFetch

async function fetchFs<T>(props: FsProps): Promise<T | T[]> {
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
        const key = props.whereClause 
                    ? [collection, props.whereClause[0], props.whereClause[1]]
                    : [collection, "all"]

        const colRef = collection(db, props.collectionName)
        const snapshot = await getDocs(colRef)
        const dataCollection = snapshot.docs?.map(doc => ({
            ...doc.data(),
            id: doc.id
        })) as T[]

        return dataCollection
    }
}

export function useFetchFs<T>(
    props: FsProps,
    options?: UseQueryOptions<T | T[], Error>
) {
    const key: QueryKey = props.single
    ? [props.collectionName, props.id]                             // Single-doc key
    : props.whereClause                                              // Multi-doc + where
    ? [
        props.collectionName,
        props.whereClause[0],
        props.op ?? '==',
        props.whereClause[1],
      ]
    : [props.collectionName, 'all']                                 // All-docs key
 
}