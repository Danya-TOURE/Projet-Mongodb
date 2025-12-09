// app.js
import express from "express";
import morgan from "morgan";

import healthRouter from "./routes/health.routes.js";
import dataRouter from "./routes/data.routes.js";
import statsRouter from "./routes/stats.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import exportRouter from "./routes/export.routes.js";

const app = express();

// Middlewares globaux
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/healthcheck", healthRouter);
app.use("/import", dataRouter);
app.use("/stats", statsRouter);
app.use("/export", exportRouter);

// 404 - route inexistante
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Middleware global d'erreurs (toujours en dernier)
app.use(errorHandler);

export default app;
