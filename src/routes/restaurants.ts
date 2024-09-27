import express from "express"
import { RestaurantSchema } from "../schemas/restaurants.js"
import { validate } from "../middlewares/validate.js"

const router = express.Router()

router.post(("/"),validate(RestaurantSchema),(req,res)=>{
    res.send(req.body as typeof RestaurantSchema)

})

export default router