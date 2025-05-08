import {userSocketMap} from '../lib/socket.js'
export const formatErrors = (validationErrors) => {
    const formattedErrors = {}

    for (const key in validationErrors.errors) {
        formattedErrors[key] = validationErrors.errors[key].message
    }
    return {errors: formattedErrors, message: validationErrors._message}
}

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}