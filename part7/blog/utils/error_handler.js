const logger = require("../utils/logger");
const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: "Bad Request" });
  } else if (error.name === "TypeError") {
    logger.error(error);
  } else if (error.code === 11000) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  } else {
    logger.error(error);
  }
  next(error);
};

module.exports = {
  errorHandler,
};
