import express from "express"
import router from "./routes/index.js";
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/v1",router)

export default app