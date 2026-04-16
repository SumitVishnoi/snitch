import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "../src/routes/auth.routes.js"
import cors from "cors"
import {Strategy as GoogleStartegy } from "passport-google-oauth20"
import { config } from "./config/config.js"
import passport from "passport"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(passport.initialize())

passport.use(new GoogleStartegy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile)
}))

app.use("/api/auth", authRouter)

export default app