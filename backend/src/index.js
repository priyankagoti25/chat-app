import dotenv from "dotenv"
dotenv.config({path: './.env'})
import {connectDB} from "./db/index.js"
import {server} from "./lib/socket.js";


const startServer = async () => {
    await connectDB()
    server.listen(process.env.PORT, () => {
        console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`)
    })
}

await startServer()
