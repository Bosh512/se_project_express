const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("../utils/AuthenticationError");
const { JWT_SECRET } = require("../utils/config");

const replaceBearerToken = (header) => header.replace("Bearer ", "");

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new AuthenticationError("Authorization required"));
  }
  const token = replaceBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return next(new AuthenticationError("Authorization required"));
  }
  req.user = payload;
  return next();
}

module.exports = auth;
