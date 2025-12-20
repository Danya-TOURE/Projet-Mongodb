// Contient toutes les routes avancées : statut, priorité, recherche…

import Task from "../Models/task.js";


// modifier uniquement le statut
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Statut requis" });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};


// filtrer par priorité
export const getTasksByPriority = async (req, res) => {
  try {
    const { level } = req.params;

    const tasks = await Task.find({ priority: level });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};


// recherche + filtres + tri
export const searchTasks = async (req, res) => {
  try {
    const { title, status, priority, sort } = req.query;

    const filter = {};

    if (title) filter.title = { $regex: title, $options: "i" };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    let query = Task.find(filter);

    if (sort) query = query.sort(sort);

    const tasks = await query;

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};