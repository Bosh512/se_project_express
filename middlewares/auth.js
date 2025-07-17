const jwt = require("jsonwebtoken");
const { authenticationError } = require("../utils/error");
const { JWT_SECRET } = require("../utils/config");

const replaceBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return authenticationError(res);
  }
  const token = replaceBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return authenticationError(res);
  }
  req.user = payload;
  return next();
}

module.exports = auth;
