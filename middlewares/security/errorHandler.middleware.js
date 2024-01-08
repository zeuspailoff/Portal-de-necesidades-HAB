const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack);
  
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
      error: {
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? 'Error en producción' : err.stack,
      },
    });
  };
  
  module.exports = errorHandlerMiddleware;
  