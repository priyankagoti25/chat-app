import {Router} from "express";
import {login, logout, signup} from "../controllers/auth.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const authRoutes = Router()

authRoutes.route("/signup").post(upload.single("profilePic"), signup)
authRoutes.route("/login").post(login)
authRoutes.route("/logout").post(logout)

export default authRoutes;