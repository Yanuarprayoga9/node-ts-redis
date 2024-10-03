import express from "express";
import {type Request} from "express"
import { validate } from "../middlewares/validate.js";
import { RestaurantSchema, type Restaurant } from "../schemas/restaurants.js";
import { initializeRedisClient } from "../utils/client.js";
import { nanoid } from "nanoid";
import {
  bloomKey,
  cuisineKey,
  cuisinesKey,
  restaurantCuisinesKeyById,
  restaurantKeyById,
  restaurantsByRatingKey,
} from "../utils/keys.js";
import { errorResponse, successResponse } from "../utils/responses.js";

const router = express.Router();

router.post("/", validate(RestaurantSchema), async (req, res, next) => {
  const data = req.body as Restaurant;
  try {
    console.log(data);
    const client = await initializeRedisClient();
    const id = nanoid();
    const restaurantKey = restaurantKeyById(id);
    console.log(restaurantKey);
    const bloomString = `${data.name}:${data.location}`;
    console.log(bloomString);
    const seenBefore = await client.bf.exists(bloomKey, bloomString);
    if (seenBefore) {
      return errorResponse(res, 409, "restaurant already exists");
    }
    const hashData = { id, name: data.name, location: data.location };
    const cuisines = data.cuisines;
    Promise.all([
      ...cuisines.map((cuisine) => {
        client.sAdd(cuisinesKey, cuisine), client.sAdd(cuisineKey(cuisine), id);
        client.sAdd(restaurantCuisinesKeyById(id), cuisine);
        client.hSet(restaurantKey, hashData);
        client.zAdd(restaurantsByRatingKey, {
          score: 0,
          value: id,
        }),
          client.bf.add(bloomKey, bloomString);
      }),
    ]);
    return successResponse(res, hashData, "Added new restaurant");
  } catch (error) {
    next(error);
  }
});
router.get("/:restaurantId",async (req:Request<{restaurantId:string}>,res,next)=>{
    const {restaurantId} = req.params;
    try {
        const client = await initializeRedisClient();
        const restaurantKey = restaurantKeyById(restaurantId);
        console.log(restaurantKey)
        const restaurant = await client.hGetAll(restaurantKey);
        console.log(restaurant)
        successResponse(res,restaurant,"restaurant")
    } catch (error) {
        next(error)
    }
})

export default router;
