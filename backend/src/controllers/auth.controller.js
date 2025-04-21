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
    const user = new User({...req.body, email: req.body?.email?.toLowerCase()})
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

const logout = async (req, res)=> {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {refreshToken: 1}
        },
        {
            new: true
        }
    )

    res.status(200)
        .clearCookie("accessToken", cookieOption)
        .clearCookie("refreshToken", cookieOption)
        .json({message: "User logged out successfully"})
}

const updateProfilePic = async (req, res) => {
    try {
        if(!req?.file) {
            return res.status(400).json({message: "Profile pic is required"})
        }

        const localPath = req.file?.path
        const profilePic = await uploadOnCloudinary(localPath)
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: { profilePic : profilePic?.url || "" }
            },
            {
                new: true
            }
        ).select("-password -refreshToken")
        return res.status(200).json({message: "Profile pic updated successfully", user})
    } catch (e){
        return res.status(500).json({message: "Something went wrong while updating profile pic"})
    }

}

const getUsers = async (req, res) => {
    try {
        const loggedInUserId = req?.user?._id
        const users = await User.find({_id: {$ne: loggedInUserId}}).select("-password -refreshToken")
        res.status(200).json({data: users})
    } catch (e) {
        res.status(500).json({message: "Something went wrong while getting users"})
    }
}

export { signup, login, logout, updateProfilePic, getUsers }