import mongoose from 'mongoose';

/**
 * Connexion à MongoDB Atlas
 * Cette fonction établit la connexion avec la base de données
 */
const connectDB = async () => {
  try {
    // Connexion à MongoDB avec l'URL depuis .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connecté : ${conn.connection.host}`);
    console.log(`Base de données : ${conn.connection.name}`);
  } catch (error) {
    console.error(` Erreur de connexion MongoDB : ${error.message}`);
    process.exit(1); // Arrête l'application si la connexion échoue
  }
};

export default connectDB;