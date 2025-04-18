import {User} from "../models/user.model.js";
import {formatErrors} from "../utils/helpers.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {cookieOption} from "../utils/contants.js";

const generateAccessRefreshToken = async (userId) => {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false})
    return { accessToken, refreshToken }
}
const signup = async (req, res)=>{
    const user = new User({...req.body, email: email.toLowerCase()})
    const validationErrors = user.validateSync()
    if(validationErrors){
       return res.status(400).send(formatErrors(validationErrors))
    }
    const existedUser = await User.findOne({email: req.body.email.toLowerCase()})
    if(existedUser) {
        return res.status(400).send({message: "User already exist"})
    }
    const profilePicPath = req?.file?.path
    const profilePic = await uploadOnCloudinary(profilePicPath)
    user.profilePic = profilePic?.url || ""
    await user.save()
    const createdUser = await User.findById(user._id).select("-password")
    if(!createdUser) {
        return res.status(500).json({message:"Something went wrong while creating user"})
    }
    return res.status(201).json({message:"User registered successfully", data: user})
}

const login = async (req, res)=>{
    const {email, password} = req.body
    if(!email){
        return res.status(400).json({email:"Email is required"})
    }
    if(!password){
        return res.status(400).json({password:"Password is required"})
    }

    const user = await User.findOne({email: email.toLowerCase()})
    if(!user) {
        res.status(400).json({message:"User doesn't exist"})
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if(!isPasswordCorrect) {
        res.status(400).json({message:"Password does not match"})
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res.status(200)
        .cookie("accessToken", accessToken, cookieOption)
        .cookie("refreshToken", refreshToken, cookieOption)
        .json({
        message: "User logged in successfully",
        data: {
            user: loggedInUser,
            accessToken,
            refreshToken
        }
    })
}

const logout = (req, res)=>{
    res.send("signup route")
}

export { signup, login, logout }