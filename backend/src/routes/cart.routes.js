import express from "express"
import { authenticateUser } from "../middlewares/auth.middleware.js"
import { validateAddToCart, validateIncrementCartItemQuantity } from "../validators/cart.validator.js"
import { addToCart, decrementQuantity, getCart, incrementQuantity } from "../controllers/cart.controller.js"


const cartRouter = express.Router()

/**
 * @route POST /api/cart/add/:productId/:variantId
 * @description Product add to cart
 * @access Private
 */
cartRouter.post("/:productId/:variantId", authenticateUser, validateAddToCart, addToCart)

/**
 * @route GET /api/cart/
 * @description get the porduct data by the user
 * @access Private
 */
cartRouter.get("/", authenticateUser, getCart)

/**
 * @route PATCH /api/cart/qunatity/increment/:productId/:variantId
 * @descritpion increment the quantity of the product in the cart by one
 * @access Private
 */
cartRouter.patch("/quantity/increment/:productId/:variantId", authenticateUser, validateIncrementCartItemQuantity, incrementQuantity)

/**
 * @route PATCH /api/cart/quantity/decrement/:productId/:variantid
 * @descritption decrement the quantity of the product in the cart by one
 * @access Private
 */
cartRouter.patch("/quantity/decrement/:productId/:variantId", authenticateUser, validateIncrementCartItemQuantity, decrementQuantity)

export default cartRouter