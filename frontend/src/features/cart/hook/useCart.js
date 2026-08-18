import { addToCart, decrementCartItemQuantityApi, deleteCartItem, getCart, incrementCartItemQuantityApi } from "../service/cart.api"
import {useDispatch} from "react-redux"
import { decrementItemQuantity, incrementItemQuantity, setCart } from "../state/cart.slice"


const useCart = ()=> {
    const dispatch = useDispatch()
    const handleAddToCart = async ({productId, variantId})=> {
        const data = await addToCart({productId, variantId})

        return data
    }

    const handleGetCart = async ()=> {
        const data = await getCart()
        console.log(data.cart.items)
        dispatch(setCart(data.cart))
    }

    const handleIncrementCartItemQuantity = async ({productId, variantId})=> {
        await incrementCartItemQuantityApi({productId, variantId})
        dispatch(incrementItemQuantity({productId, variantId}))
    }

    const handleDecrementCartItemQuantity = async ({productId, variantId})=> {
        await decrementCartItemQuantityApi({productId, variantId})
        dispatch(decrementItemQuantity({productId, variantId}))
    }

    const handleDeleteCartItem = async ({productId, variantId}) => {
        await deleteCartItem({productId, variantId})
        dispatch(setCart(prevCart => {
            const updatedItems = prevCart.items.filter(item => !(item.productId === productId && item.variantId === variantId))
            return {...prevCart, items: updatedItems}
        }))
    }


    return {
        handleAddToCart,
        handleGetCart,
        handleIncrementCartItemQuantity,
        handleDecrementCartItemQuantity,
        handleDeleteCartItem
    }
}

export default useCart