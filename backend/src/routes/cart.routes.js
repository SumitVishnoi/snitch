import express from "express"
import { authenticateUser } from "../middlewares/auth.middleware.js"
import { validateAddToCart } from "../validators/cart.validator.js"
import { addToCart } from "../controllers/cart.controler.js"

const cartRouter = express.Router()

cartRouter.post("/", authenticateUser, validateAddToCart, addToCart)

export default cartRouter