import { useStore } from '@/store/useStore'
import { CartItem } from '@/store/types'

export default function AddToCartBtn({
    foodId,
    quantity,
    foodTitle,
    imgUrl,
    userId,
    price
}: Omit<CartItem, "addedAt">) {
    const addToCart = useStore(s => s.addToCart)
        const inCartQty = useStore(s => s.cartItems[foodId]?.quantity || 0)
        const isSoldOut = inCartQty>= quantity
        
        const handleCart = (
            e:React.MouseEvent<HTMLButtonElement>,
            id: string,
            foodTitle: string,
            imgUrl: string
        ): void => {
            e.preventDefault()
    
            addToCart({id, foodTitle, imgUrl, availableQty:quantity, price})
        }

    return <button className={`btn gap-2 mt-auto ${isSoldOut ? "disabled" : ""}`} disabled={isSoldOut} onClick={(e) => handleCart(e, foodId, foodTitle, imgUrl ?? "")}>{isSoldOut ? "Sold out" : "Add to cart"}</button>
}