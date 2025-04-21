import {Router} from "express";
import {login, logout, signup, updateProfile} from "../controllers/auth.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { jwtVerify} from "../middlewares/auth.middleware.js";

const authRoutes = Router()

authRoutes.route("/signup").post(upload.single("profilePic"), signup)
authRoutes.route("/login").post(login)
authRoutes.route("/logout").post(jwtVerify, logout)
authRoutes.route("/updateProfile").post(jwtVerify, upload.single("profilePic"), updateProfile)

export default authRoutes;