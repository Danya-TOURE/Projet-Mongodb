import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Task from "../models/task.model.js";
import "dotenv/config";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/projet_mongodb";

async function run() {
  await mongoose.connect(MONGO_URI);

  const tasks = await Task.find().lean();

  const fileName = `export_tasks_${Date.now()}.json`;
  const filePath = path.resolve("data", fileName);

  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");

  console.log(`✅ Export terminé : ${tasks.length} tasks exportées`);
  console.log(`📁 Fichier créé : ${filePath}`);

  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error("❌ Export error:", err);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
