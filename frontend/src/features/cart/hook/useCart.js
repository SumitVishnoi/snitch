import { addToCart } from "../service/cart.api"


const useCart = ()=> {
    const handleAddToCart = async ({productId, variantId})=> {
        const data = await addToCart({productId, variantId})

        return data
    }

    return {
        handleAddToCart
    }
}

export default useCart