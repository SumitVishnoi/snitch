import { useDispatch } from "react-redux"
import { createProduct, getSellerProduct } from "../service/product.api"
import { setSellerProduct } from "../state/product.slice"


export const useProduct = ()=> {

    const dispatch = useDispatch()
    
    async function handleCreateProduct(formData) {
        try {
            const data = await createProduct(formData)
            return data.product
        } catch (error) {
            throw new Error ("Product creation failed")
        }
    }

    async function handleGetSellerProduct() {
        try {
            const data = await getSellerProduct()
            dispatch(setSellerProduct(data.products))
        } catch (error) {
            throw new Error ("Failed to fetch seller products")
        }
    }

    return {
        handleCreateProduct,
        handleGetSellerProduct
    }
}