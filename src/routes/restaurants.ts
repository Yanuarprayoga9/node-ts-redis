import express from "express"
import { RestaurantSchema } from "../schemas/restaurants.js"
import { validate } from "../middlewares/validate.js"
import { initializeRedisClient } from "../utils/client.js"

const router = express.Router()

router.get("/",(req,res)=>{
    initializeRedisClient()
    res.send("hello")
})
router.post("/",validate(RestaurantSchema),(req,res)=>{
    initializeRedisClient()
    res.send(req.body as typeof RestaurantSchema)

})

export default router 