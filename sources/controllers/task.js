import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },           // titre de la tâche
  description: { type: String, required: true },                 // description
  dueDate: { type: Date, required: true },                       // date limite
  status: {                                                      
    type: String,
    enum: ["todo", "in-progress", "done"],                       // statut limité à ces valeurs
    default: "todo"
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],                             // priorité
    default: "medium"
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // référence à l'utilisateur
}, { timestamps: true });                                         // crée createdAt et updatedAt automatiquement

export default mongoose.model("Task", TaskSchema);
