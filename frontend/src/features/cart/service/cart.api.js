import axios from "axios";

const cartAPIInstance = axios.create({
    baseURL: "/api/cart",
    withCredentials: true
})

export const addToCart = async ({productId, variantId})=> {
    const response = await cartAPIInstance.post(`/add/${productId}/${variantId}`, {
        quantity: 1
    } )

    return response.data
}

