import { useDispatch } from "react-redux"
import { createProduct, getAllProducts, getProductById, getSellerProduct } from "../service/product.api"
import { setProducts, setSellerProduct } from "../state/product.slice"


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

    async function handleGetAllProducts() {
        try {
            const data = await getAllProducts() 
            dispatch(setProducts(data.products))
        } catch (error) {
            throw new Error("Products are not fetched")
        }
    }

    async function handleGetProductById(productId) {
        try {
            const data = await getProductById(productId)
            return data.product
        } catch (error) {
            throw new Error("Doesn't not found detail of product")
        }
    }

    return {
        handleCreateProduct,
        handleGetSellerProduct,
        handleGetAllProducts,
        handleGetProductById
    }
}