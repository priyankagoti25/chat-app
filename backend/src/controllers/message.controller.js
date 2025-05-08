import {Message} from "../models/message.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {getReceiverSocketId} from "../utils/helpers.js";
import {io} from '../lib/socket.js'
const getMessages = async (req, res) => {
    try {
        const { id: userToChatId} = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or: [
                    {senderId: myId, receiverId: userToChatId},
                    {senderId: userToChatId, receiverId: myId},
                ]
        })
        res.status(200).json({data: messages})
    } catch (e) {
        res.status(500).json({message: "Internal server error"})
    }
}

const sendMessage = async (req, res) => {
    try {
        const {id: receiverId} = req.params
        const senderId = req.user._id
        const {text} = req.body
        let imageUrl;

        const filePath = req?.file?.path
        if(filePath) {
            const cloudinaryImage = await uploadOnCloudinary(filePath)
            imageUrl = cloudinaryImage?.url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save()

        // todo: real-time functionality will goes here. => socket.io
        const receiverSocketId = getReceiverSocketId(receiverId)
        io.to(receiverSocketId).emit("newMessage", newMessage)

        res.status(201).json({data: newMessage})

    } catch (e) {
        res.status(500).json({message: "Internal server error"})
    }

}

export { getMessages, sendMessage }