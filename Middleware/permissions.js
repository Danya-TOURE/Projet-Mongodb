// Vérifie que seul le créateur peut modifier ou supprimer la tâche

import Task from "../Models/task.js";

export const checkTaskOwnership = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Tâche introuvable" });
    }

    // Vérifie si l'utilisateur est le créateur
    if (task.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: "Permission refusée" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};