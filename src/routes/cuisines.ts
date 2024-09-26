import express from "express";
import type {Request,Response} from "express"
const router = express.Router();
router.get("/",async (req:Request,res:Response)=>{
    res.status(201).json({success:true})
})

export default router