import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate:{
            validator : function (value){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Invalid email"
        },

    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Minimum 6 characters are required"]
    },
    profilePic: {
        type: String,
        default: ""
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign({
            _id: this._id,
            fullName: this.fullName,
            email: this.email
         },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
         },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

export const User = mongoose.model("User", userSchema)