import productModel from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js"


export const createProduct = async (req, res)=> {
    const {title, description, priceAmount, priceCurrency} = req.body

    const seller = req.user

    const images = await Promise.all(req.files.map(async (file)=> {
        return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname
        })
    }))

    const product = await productModel.create({
        title,
        description,
        seller: seller._id,
        price: {
            amount: priceAmount,
            currency: priceCurrency
        },
        images
    })

    res.status(201).json({
        message: "Product created successfully",
        success: true,
        product
    })
}


export const getSellerProduct = async (req, res)=> {
    const seller = req.user

    const products = await productModel.find({seller: seller._id})

    res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        products
    })
}

export const getAllProducts = async (req, res)=> {
    const products = await productModel.find()

    res.status(200).json({
        success: true,
        message: "fetched all products successfully",
        products
    })
}

export const getProuctDetail = async (req, res)=> {
    const {productId} = req.params

    const product = await productModel.findById(productId)

    if(!product) {
        return res.status(404).json({
            status: false,
            message: "Product not found"
        })
    }

    res.status(200).json({
        success: true,
        message: "Product detail fetched successfully",
        product
    })
}