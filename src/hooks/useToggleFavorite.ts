import { useMutation, useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore/lite'
import { db } from '@/app/lib/firebase'
import { useStore } from '@/store/useStore'

export function useToggleFavorite(foodId: string) {
    const currentUser = useStore(s => s.user)
    const customer = useStore(s => s.customer)
    const addFav = useStore(s => s.addFavorite)
    const removeFav = useStore(s => s.removeFavorite)

    const isFav = useStore(s =>
        s.user?.role === 'customer'
            ? s.customer?.favourites?.includes(foodId) ?? false
            : false
    )

    const queryClient = useQueryClient()

    const mutation = useMutation<void, Error, boolean>({
        mutationFn: (fav) => {
          if (!currentUser) throw new Error('Not logged in!')
          const ref = doc(db, 'customers', currentUser.id)
          return updateDoc(
            ref,
            'favourites',
            fav ? arrayUnion(foodId) : arrayRemove(foodId)
          )
        },
        onMutate: (fav: boolean) => {
            fav ? addFav(foodId) : removeFav(foodId)
        },
        onError: (err: any, fav: boolean) => {
            console.log('rolled back to', !fav)
            console.error('toggleFav failed:', err)

            fav ? removeFav(foodId) : addFav(foodId)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['customer', currentUser?.id],
            })
        }
    })

    const toggleFav = () => {
        const next = !isFav
        mutation.mutate(next)
    }

    return {
        isFav,
        toggleFav: toggleFav,
        isPending: mutation.isPending,
        error: mutation.error
    }   
}