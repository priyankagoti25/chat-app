import {Router} from "express";
import authRoutes from "./auth.route.js";
import messageRoute from "./message.route.js";

const router = Router()

router.use("/auth", authRoutes)
router.use("/messages", messageRoute)

export default router;