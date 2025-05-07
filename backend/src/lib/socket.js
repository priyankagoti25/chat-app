import {Server} from "socket.io";
import app from "../app.js";
import http from 'http'

const server = http.createServer(app)

const io =  new Server(server,{
    cors: {
        origin: ["http://localhost:5173"]
    }
})

io.on("connection", (socket)=>{
    console.log("A user connected", socket.id)
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id)
    })
})

export {io, server}