import axios from "axios";

const cartAPIInstance = axios.create({
    baseURL: "/api/cart",
    withCredentials: true
})

export const addToCart = async ({productId, variantId})=> {
    const response = await cartAPIInstance.post(`/${productId}/${variantId}`, {
        quantity: 1
    } )

    return response.data
}

export const getCart = async ()=> {
    const response = await cartAPIInstance.get("/")

    return response.data
}

export const incrementCartItemQuantityApi = async  ({productId, variantId})=> {
    const response = await cartAPIInstance.patch(`/quantity/increment/${productId}/${variantId}`)

    return response.data
}

export const decrementCartItemQuantityApi = async ({productId, variantId})=> {
    const response = await cartAPIInstance.patch(`/quantity/decrement/${productId}/${variantId}`)

    return response.data
}