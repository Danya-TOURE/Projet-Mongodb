import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

// Charger les variables d'environnement
dotenv.config();

// Créer l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB
connectDB();

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API Gestion de Tâches - Backend actif',
    version: '1.0.0',
    endpoints: {
      categories: '/api/categories'
    }
  });
});

// Routes de l'API
app.use('/api/categories', categoryRoutes);

// Middleware de gestion des erreurs (doit être en dernier)
app.use(errorHandler);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🌐 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 URL : http://localhost:${PORT}`);
  console.log(`📁 Routes disponibles :`);
  console.log(`   - POST   http://localhost:${PORT}/api/categories`);
  console.log(`   - GET    http://localhost:${PORT}/api/categories`);
  console.log(`   - GET    http://localhost:${PORT}/api/categories/:id/tasks`);
  console.log(`   - PUT    http://localhost:${PORT}/api/categories/:id`);
  console.log(`   - DELETE http://localhost:${PORT}/api/categories/:id\n`);
});