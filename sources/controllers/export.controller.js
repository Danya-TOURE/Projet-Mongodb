// sources/controllers/export.controller.js
import fs from "fs";
import Task from "../../models/task.model.js";

export const exportTasksToJson = async (req, res, next) => {
  try {
    // 1. Récupération des filtres éventuels
    const { status, priority } = req.query;

    const query = {};

    if (status) query.status = status;
    if (priority) query.priority = priority;

    // 2. Récupérer les tâches filtrées dans MongoDB
    const tasks = await Task.find(query).lean();

    // 3. Créer un nom de fichier dynamique
    const fileName = `export_tasks_${Date.now()}.json`;
    const filePath = `data/${fileName}`;

    // 4. Écrire le fichier JSON
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

    // 5. Répondre
    res.json({
      status: "success",
      message: `Export effectué avec succès.`,
      file: fileName,
      count: tasks.length,
    });
  } catch (err) {
    next(err);
  }
};
