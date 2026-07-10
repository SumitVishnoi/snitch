import express from "express"
import { authenticateSeller } from "../middlewares/auth.middleware.js"
import multer from "multer"
import { addProductVariant, createProduct, getAllProducts, getProuctDetail, getSellerProduct } from "../controllers/product.controller.js"
import { createProductValidator } from "../validators/product.validator.js"


const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
})

/**
 * @route POST /api/products/
 * @description create new product by seller
 * @access Private
 */
router.post("/", authenticateSeller, upload.array("images", 7), createProductValidator, createProduct)

/**
 * @route GET /api/products/seller
 * @desc get all products created by seller
 * @access Private
 */
router.get("/seller", authenticateSeller, getSellerProduct)

/**
 * @route GET /api/products/
 * @desc get all the products 
 * @access Public
 */
router.get("/", getAllProducts)

/**
 * @route GET /api/products/detail/:id
 * @desc get the product detail
 * @access Public
 */
router.get("/detail/:productId", getProuctDetail)

/**
 * @route POST /api/products/:productId/variants
 * @desc create the variants of the product
 * @access Private
 */
router.post("/:productId/variants", authenticateSeller, upload.array("images", 7), createProductValidator, addProductVariant)

export default router