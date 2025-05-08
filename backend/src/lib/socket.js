import {Server} from "socket.io";
import {server} from "../app.js"

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

export {io}