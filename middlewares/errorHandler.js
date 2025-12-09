// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error Middleware:", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal server error",
  });
};

export default errorHandler;
