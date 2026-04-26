import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import {config} from "../config/config.js"

async function sendTokenResponse(user, res, message) {
    const token = jwt.sign(
        {id: user.id},
        config.JWT_SECRET,
        {expiresIn: "7d"}
    )

    res.cookie("token", token)

    res.status(200).json({
        message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })
}

export const register = async (req, res)=> {
    const {fullname, email, password, contact, isSeller} = req.body

    try {
         const isUserExist = await userModel.findOne({email})

    if(isUserExist) {
        return res.status(400).json({
            message: "User already exist",
            success: false
        })
    }

    const user = await userModel.create({
        fullname,
        email,
        password,
        contact,
        role: isSeller ? "seller" : "buyer"
    })

    await sendTokenResponse(user, res, "User registered successfully")

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}


export const login = async (req, res)=> {
    const {email, password} = req.body

    try {
        const user = await userModel.findOne({email})

        if(!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            })
        }

        const isMatch = await user.comparePassword(password)

        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            })
        }

        sendTokenResponse(user, res, "User loggedIn successfully")

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
}


export const googleCallback = async (req, res)=> {
    const {id, displayName, emails, photos} = req.user
    const email = emails[0].value
    const profilePic = photos[0].value

    let user = await userModel.findOne({email})

    if(!user) {
        user = await userModel.create({
            email,
            googleId: id,
            fullname: displayName
        })
    }

    const token = jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    )

    res.cookie("token", token)

    res.redirect("http://localhost:5173/")
}

export const getMe = async (req, res)=> {
    const user =  req.user

    res.status(200).json({
        message: "User fetched successfully",
        success: true,
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            contact: user.contact,
            role: user.role
        }
    })
}