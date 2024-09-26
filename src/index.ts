import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import cuisinesRouter from "./routes/cuisines.js";

// Mengatur dotenv
dotenv.config();

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use("/cuisines", cuisinesRouter);
// Endpoint root
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Menjalankan server
app.listen(PORT || 3000, () => {
  console.log(`App running on port ${PORT || 3000}`);
});
