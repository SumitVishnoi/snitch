import { addToCart, getCart } from "../service/cart.api"
import {useDispatch} from "react-redux"


const useCart = ()=> {
    const dispatch = useDispatch()
    const handleAddToCart = async ({productId, variantId})=> {
        const data = await addToCart({productId, variantId})

        return data
    }

    const handleGetCart = async ()=> {
        const data = await getCart()
        console.log(data.cart.items)
        dispatch(setItems(data.cart.items))
    }

    return {
        handleAddToCart,
        handleGetCart
    }
}

export default useCart