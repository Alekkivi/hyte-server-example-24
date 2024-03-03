/* eslint-disable linebreak-style */

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error); // forward error to error handler
};
// eslint-disable-next-line valid-jsdoc
/**
 * Custom default middleware for handling errors
 */
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
      errors: err.errors || '',
    },
  });
};

export {notFoundHandler, errorHandler};
