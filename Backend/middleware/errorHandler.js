// Global Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error("Global Error Caught:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

export default errorHandler;
