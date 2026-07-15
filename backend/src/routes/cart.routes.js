import express from "express"
import { authenticateUser } from "../middlewares/auth.middleware.js"
import { validateAddToCart } from "../validators/cart.validator.js"
import { addToCart, getCart } from "../controllers/cart.controller.js"


const cartRouter = express.Router()

/**
 * @route POST /api/cart/add/:productId/:variantId
 * @description Product add to cart
 * @access Private
 */
cartRouter.post("/", authenticateUser, validateAddToCart, addToCart)

/**
 * @route GET /api/cart/
 * @description get the porduct data by the user
 * @access Private
 */
cartRouter.get("/", authenticateUser, getCart)

export default cartRouter