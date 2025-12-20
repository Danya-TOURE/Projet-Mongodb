// Vérifie que l'utilisateur est connecté via un token

import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};