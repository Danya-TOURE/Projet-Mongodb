// routes/stats.routes.js
import { Router } from "express";
import { getGlobalStats } from "../sources/controllers/stats.controller.js";

const router = Router();

// Route GET /stats
router.get("/", getGlobalStats);

export default router;
