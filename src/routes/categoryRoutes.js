import express from 'express';
import {
  createCategory,
  getAllCategories,
  getTasksByCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';

const router = express.Router();


// Routes pour la gestion des catégories
 

// Post ROUTE 1 : Créer une nouvelle catégorie

router.post('/', createCategory);

// Get ROUTE 2 : Récupérer toutes les catégories
router.get('/', getAllCategories);

// Get ROUTE 3 : Récupérer les tâches d'une catégorie (avec agrégation)
router.get('/:id/tasks', getTasksByCategory);

// Mettre à jour une catégorie
// 
router.put('/:id', updateCategory);

// Supprimer une catégorie
router.delete('/:id', deleteCategory);

export default router;