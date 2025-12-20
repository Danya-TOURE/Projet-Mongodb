import mongoose from 'mongoose';

/**
 * Schéma Mongoose pour les Catégories
 * Définit la structure d'une catégorie dans la base de données
 */
const categorySchema = new mongoose.Schema(
  {
    // Nom de la catégorie (obligatoire et unique)
    name: {
      type: String,
      required: [true, 'Le nom de la catégorie est obligatoire'],
      unique: true, // Empêche les doublons
      trim: true, // Supprime les espaces avant/après
      minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
    },
    
    // Couleur (optionnelle)
    color: {
      type: String,
      trim: true,
      default: '#eb8f8fff' // rose par défaut
    }
  },
  {
    // Options du schéma
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
    collection: 'categories' // Nom de la collection dans MongoDB
  }
);

/**
 * Index pour améliorer les performances de recherche
 * Rend la recherche par nom plus rapide
 */
categorySchema.index({ name: 1 });

/**
 * Méthode virtuelle pour compter les tâches (optionnel)
 * Peut être utilisée plus tard si besoin
 */
categorySchema.virtual('taskCount', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'category',
  count: true
});

// Export du modèle
const Category = mongoose.model('Category', categorySchema);

export default Category;