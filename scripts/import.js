import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Task from "../models/task.model.js"; 

import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/projet_mongodb";

async function run() {
  await mongoose.connect(MONGO_URI);

  const filePath = path.resolve("data", "tasks.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  await Task.insertMany(data);

  console.log(`✅ Import terminé: ${data.length} tasks insérées`);
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error("❌ Import error:", err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
