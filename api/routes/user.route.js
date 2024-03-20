import express from "express";
import {  getAllUsers, updateUser } from "../controllers/user.controller.js";

const router = express.Router();


router.get('/get', getAllUsers)
router.post('/update', updateUser)


export default router