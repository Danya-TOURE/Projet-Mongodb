import Category from '../models/Category.js';
import validator from 'validator';
import mongoose from 'mongoose';

/**
 * ROUTE 1 : Créer une nouvelle catégorie
 * POST /categories
 */
export const createCategory = async (req, res, next) => {
  try {
    const { name, color } = req.body;

    // Validation : le nom est obligatoire
    if (!name || validator.isEmpty(name.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Le nom de la catégorie est obligatoire'
      });
    }

    // Validation : longueur du nom
    if (!validator.isLength(name.trim(), { min: 2, max: 50 })) {
      return res.status(400).json({
        success: false,
        message: 'Le nom doit contenir entre 2 et 50 caractères'
      });
    }

    // Validation optionnelle : format de la couleur (si fournie)
    if (color && !validator.matches(color, /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      return res.status(400).json({
        success: false,
        message: 'Format de couleur invalide. Utilisez un code hexadécimal (ex: #FF5733)'
      });
    }

    // Vérifier si une catégorie avec ce nom existe déjà
    const existingCategory = await Category.findOne({ 
      name: name.trim() 
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: `La catégorie "${name}" existe déjà`
      });
    }

    // Créer la nouvelle catégorie
    const category = await Category.create({
      name: name.trim(),
      color: color || '#808080'
    });

    res.status(201).json({
      success: true,
      message: 'Catégorie créée avec succès',
      data: category
    });

  } catch (error) {
    next(error);
  }
};

/**
 * ROUTE 2 : Récupérer toutes les catégories
 * GET /categories
 */
export const getAllCategories = async (req, res, next) => {
  try {
    // Récupérer toutes les catégories, triées par nom
    const categories = await Category.find()
      .sort({ name: 1 }) // Tri alphabétique
      .select('name color createdAt updatedAt'); // Sélectionner les champs à retourner
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });

  } catch (error) {
    next(error);
  }
};

/**
 * ROUTE 3 : Récupérer toutes les tâches d'une catégorie spécifique
 * GET /categories/:id/tasks
 * 
 * Cette route utilise une AGRÉGATION MongoDB avec $lookup
 * pour joindre les tâches à la catégorie
 */
export const getTasksByCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validation : vérifier que l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID de catégorie invalide'
      });
    }

    // Vérifier si la catégorie existe
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie introuvable'
      });
    }

    /**
     * PIPELINE D'AGRÉGATION MongoDB
     * Cette agrégation fait un "lookup" (jointure) avec la collection Tasks
     */
    const result = await Category.aggregate([
      // Étape 1 : Filtrer pour garder seulement la catégorie demandée
      {
        $match: { _id: new mongoose.Types.ObjectId(id) }
      },
      
      // Étape 2 : Faire une jointure avec la collection "tasks"
      {
        $lookup: {
          from: 'tasks', // Nom de la collection des tâches
          localField: '_id', // Champ dans Category
          foreignField: 'category', // Champ dans Task qui référence la catégorie
          as: 'tasks' // Nom du champ qui contiendra les tâches
        }
      },
      
      // Étape 3 : Ajouter le compte de tâches
      {
        $addFields: {
          taskCount: { $size: '$tasks' }
        }
      },
      
      // Étape 4 : Projeter (sélectionner) les champs à retourner
      {
        $project: {
          name: 1,
          color: 1,
          taskCount: 1,
          tasks: {
            _id: 1,
            title: 1,
            description: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1
          }
        }
      }
    ]);

    // Si aucun résultat (normalement impossible car on a déjà vérifié)
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie introuvable'
      });
    }

    res.status(200).json({
      success: true,
      data: result[0]
    });

  } catch (error) {
    next(error);
  }
};

/**
 * BONUS : Supprimer une catégorie
 * DELETE /categories/:id
 */
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validation de l'ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID de catégorie invalide'
      });
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie introuvable'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Catégorie supprimée avec succès',
      data: category
    });

  } catch (error) {
    next(error);
  }
};

/**
 * BONUS : Mettre à jour une catégorie
 * PUT /categories/:id
 */
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;

    // Validation de l'ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID de catégorie invalide'
      });
    }

    // Validation du nom si fourni
    if (name && !validator.isLength(name.trim(), { min: 2, max: 50 })) {
      return res.status(400).json({
        success: false,
        message: 'Le nom doit contenir entre 2 et 50 caractères'
      });
    }

    // Vérifier l'unicité du nouveau nom
    if (name) {
      const existingCategory = await Category.findOne({ 
        name: name.trim(),
        _id: { $ne: id } // Exclure la catégorie actuelle
      });

      if (existingCategory) {
        return res.status(409).json({
          success: false,
          message: `La catégorie "${name}" existe déjà`
        });
      }
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { 
        ...(name && { name: name.trim() }),
        ...(color && { color })
      },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie introuvable'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Catégorie mise à jour avec succès',
      data: category
    });

  } catch (error) {
    next(error);
  }
};