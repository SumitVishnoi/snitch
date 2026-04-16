import { Router } from "express"; 
import { googleCallback, login, register } from "../controllers/auth.controller.js";
import { validateLogin, validateRegister } from "../validators/auth.validator.js";
import passport from "passport";

const router = Router()

router.post("/register", validateRegister, register)
router.post("/login", validateLogin, login)

router.get("/google", 
    passport.authenticate('google', {scope: ['profile', 'email'] })
)

router.get("/google/callback", 
    passport.authenticate('google', {session: false}),
    googleCallback
)
export default router