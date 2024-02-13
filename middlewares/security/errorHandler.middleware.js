const errorHandlerMiddleware = (err, req, res, next) => {

  const statusCode = err.httpStatus || (res.statusCode !== 200 ? res.statusCode : 500);
  res.status(statusCode).json({
    error: {
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? 'Production error' : err.stack,
    },
  });
};

export default errorHandlerMiddleware;