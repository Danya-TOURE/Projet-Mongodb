// routes/export.routes.js
import { Router } from "express";
import { exportTasksToJson } from "../sources/controllers/export.controller.js";

const router = Router();

// Route GET /export/tasks
router.get("/tasks", exportTasksToJson);

export default router;
