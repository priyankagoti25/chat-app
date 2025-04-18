import mongoose from "mongoose";

async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`)
        console.log(`Mongo DB is connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error while connecting with database : ", error)
        process.exit(1)
    }
}

export { connectDB }