import express from "express";
import { askAIAgent, getLatLong } from "../controllers/agent.controller.js";


const router = express.Router();


router.get('/askagent', askAIAgent)
router.get('/getlatlong', getLatLong)



export default router