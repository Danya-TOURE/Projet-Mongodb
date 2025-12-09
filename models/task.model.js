// models/task.model.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "done"],
      default: "pending",
    },
    // Optionnel mais utile pour la personne 3 (tâches avancées)
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // créé automatiquement createdAt et updatedAt
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
