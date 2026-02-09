import { Router } from "express";
import marineController from "./marine.controller";

const router = Router();

router.get("/get", marineController.getMarineData); // Get all data (100 latest)
router.get("/latest", marineController.getLatestData); // Get latest single data
router.post('/post', marineController.postMarineData); // Post new data
router.get('/stream', marineController.streamMarineData); // Real-time stream

export default router;
