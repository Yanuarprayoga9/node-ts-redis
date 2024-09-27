import express from "express";
import { RestaurantSchema } from "../schemas/restaurants.js";
import { validate } from "../middlewares/validate.js";
import { initializeRedisClient } from "../utils/client.js";
import { getKeyByName } from "../utils/keys.js";
import { nanoid } from "nanoid"; 

const router = express.Router();

// Menambahkan restoran
router.post("/", validate(RestaurantSchema), async (req, res) => {
    const client = await initializeRedisClient();

    // Menggunakan nanoid untuk menghasilkan ID unik
    const restaurantId = nanoid();
    const restaurantKey = getKeyByName(`restaurant:${restaurantId}`);

    // Simpan data restoran menggunakan HSET
    await client.hSet(restaurantKey, {
        id: restaurantId, // Menyimpan ID yang dihasilkan
        name: req.body.name,
        location: req.body.location,
        cuisines: JSON.stringify(req.body.cuisines), // Menyimpan array sebagai string
    });

    res.send({ id: restaurantId, name: req.body.name, location: req.body.location, cuisines: req.body.cuisines }); // Kirimkan kembali data yang disimpan
});

// Mendapatkan restoran berdasarkan ID
router.get("/:id", async (req, res) => {
    const client = await initializeRedisClient();
    const restaurantId = req.params.id; // Mengambil ID dari parameter URL
    const restaurantKey = getKeyByName(`restaurant:${restaurantId}`);

    // Mengambil data restoran dari Redis
    const restaurantData = await client.hGetAll(restaurantKey);

    // Cek apakah data restoran ada
    if (Object.keys(restaurantData).length === 0) {
        return res.status(404).send({ message: "Restoran tidak ditemukan" });
    }

    // Mengonversi kembali cuisines dari string ke array
    restaurantData.cuisines = JSON.parse(restaurantData.cuisines as string);

    res.send(restaurantData); // Kirimkan data restoran
});

export default router;
