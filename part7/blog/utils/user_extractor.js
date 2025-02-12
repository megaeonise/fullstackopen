const jwt = require("jsonwebtoken");
const userExtractor = (request, response, next) => {
  request.user = jwt.verify(request.token, process.env.SECRET);
  next();
};

module.exports = {
  userExtractor,
};
