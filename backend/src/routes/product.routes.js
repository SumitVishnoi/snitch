import express from "express"
import { authenticateSeller } from "../middlewares/auth.middleware.js"
import multer from "multer"
import { createProduct, getSellerProduct } from "../controllers/product.controller.js"
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

export default router