// Déclare les routes avancées de gestion des tâches

import express from "express";
import {
  updateTaskStatus,
  getTasksByPriority,
  searchTasks,
} from "../controllers/taskController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkTaskOwnership } from "../middlewares/permissionMiddleware.js";

const router = express.Router();

// Modifier uniquement le statut ➜ nécessite permission
router.patch("/:id/status", authentification, checkTaskOwnership, updateTaskStatus);

// Filtrer les tâches par priorité
router.get("/priority/:level", authentification, getTasksByPriority);

// Recherche avancée
router.get("/search", authentification, searchTasks);

export default router;