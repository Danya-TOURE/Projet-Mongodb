// server.js
import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur le port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Impossible de démarrer le serveur :", err.message);
    process.exit(1);
  }
};

startServer();
