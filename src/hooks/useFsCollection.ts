import { 
    useQuery,
    UseQueryOptions,
    QueryKey,
    UseQueryResult
} from '@tanstack/react-query'
import {
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    where
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
        // fetch multiple docs
        let colRef = collection(db, props.collectionName)

        const op = props.op ?? '==' // default to '=='
        const queryRef = props.whereClause 
                    ? query(colRef, where(props.whereClause[0], op, props.whereClause[1]))
                    : colRef

        const snapshot = await getDocs(queryRef)
        const dataCollection = snapshot.docs?.map(doc => ({
            ...doc.data(),
            id: doc.id
        })) as T[]

        return dataCollection
    }
}

export function useFsCollection<T>(
    props: FsProps,
    options?: UseQueryOptions<T | T[], Error>
):UseQueryResult<T | T[], Error>{
    const key: QueryKey = props.single
    ? [props.collectionName, props.id]
    : props.whereClause
    ? [
        props.collectionName,
        props.whereClause[0],
        props.op ?? '==',
        props.whereClause[1],
      ]
    : [props.collectionName, 'all']

    return useQuery<T | T[]>({
        queryKey: key,
        queryFn: () => fetchFs<T>(props),
        ...options
    })
}