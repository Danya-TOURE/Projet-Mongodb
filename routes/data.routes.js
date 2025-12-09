// routes/data.routes.js
import { Router } from "express";
import { importTasksFromJson } from "../sources/controllers/data.controller.js";

const router = Router();

// Route d'import des tâches depuis le fichier JSON
router.post("/tasks", importTasksFromJson);

export default router;
