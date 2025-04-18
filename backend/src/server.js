import dotenv from "dotenv"
dotenv.config({path: './.env'})
import app from "./app.js"
import {connectDB} from "./db/index.js"


const startServer = async () => {
    await connectDB()
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`)
    })
}

await startServer()
