import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js";
const jwtVerify = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers?.['Authorization']?.replace("Bearer ","") || req.headers?.['authorization']?.replace("Bearer ","")
        if(!token) {
            return res.status(401).json({message: "Unauthorized request"})
        }

        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user) {
            return res.status(401).json({message: "Invalid access token"})
        }

        req.user = user
        next()
    }  catch (e) {
        return res.status(401).json({message: "Invalid access token"})
    }
}

export { jwtVerify }