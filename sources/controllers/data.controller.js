// sources/controllers/data.controller.js
import fs from "fs";
import Task from "../../models/task.model.js";

export const importTasksFromJson = async (req, res, next) => {
  try {
    // 1. Lire le fichier JSON (synchrone comme demandé dans le cahier des charges)
    const fileContent = fs.readFileSync("data/tasks.json", "utf-8");

    // 2. Parser le JSON en tableau JS
    const tasks = JSON.parse(fileContent);

    if (!Array.isArray(tasks)) {
      const error = new Error("Le fichier JSON doit contenir un tableau de tâches.");
      error.statusCode = 400;
      throw error;
    }

    // 3. Insérer les tâches en base
    const insertedTasks = await Task.insertMany(tasks);

    // 4. Répondre au client
    res.status(201).json({
      status: "success",
      message: `${insertedTasks.length} tâches importées avec succès depuis le JSON.`,
      data: insertedTasks,
    });
  } catch (err) {
    next(err); // envoie l'erreur vers le middleware global errorHandler
  }
};
