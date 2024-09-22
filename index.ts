import express from "express"
import dotenv from "dotenv"
dotenv.configDotenv();
const {PORT} = process.env

const app = express()

app.listen(PORT ?? 3000,()=>{
    console.log(`app running on port ${PORT || 3000}`)
})