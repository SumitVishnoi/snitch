import { Router } from "express"; 
import { getMe, googleCallback, login, register } from "../controllers/auth.controller.js";
import { validateLogin, validateRegister } from "../validators/auth.validator.js";
import passport from "passport";
import {config} from "../config/config.js"
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/register", validateRegister, register)
router.post("/login", validateLogin, login)

router.get("/google", 
    passport.authenticate('google', {scope: ['profile', 'email'] })
)

router.get("/google/callback", 
    passport.authenticate('google', {session: false, failureRedirect: config.NODE_ENV === "development" ? "http://localhost:5173/login" : "/login"}),
    googleCallback
)

/**
 * @route GET /api/auth/me
 * @desc get the current login user
 * @access Private
 */

router.get("/me", authenticateUser, getMe)
export default router