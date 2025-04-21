import {Router} from "express";
import {login, logout, signup, updateProfilePic, getUsers} from "../controllers/auth.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT} from "../middlewares/auth.middleware.js";

const authRoutes = Router()

authRoutes.route("/signup").post(upload.single("profilePic"), signup)
authRoutes.route("/login").post(login)
authRoutes.route("/logout").post(verifyJWT, logout)
authRoutes.route("/updateProfilePic").put(verifyJWT, upload.single("profilePic"), updateProfilePic)
authRoutes.route("/users").get(verifyJWT, getUsers)

export default authRoutes;