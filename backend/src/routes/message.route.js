import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {getMessages, sendMessage} from "../controllers/message.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const messageRoute = Router()

messageRoute.route('/:id').get(verifyJWT,getMessages)
messageRoute.route('/send/:id').post(verifyJWT,upload.single("image"),sendMessage)

export default messageRoute