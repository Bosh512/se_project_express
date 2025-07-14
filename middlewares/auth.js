const {
  DATAINVALID,
  NOTFOUND,
  SERVERERROR,
  CONFLICTERROR,
  AUTHENTICATIONERROR,
} = require("../utils/error");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const handleAuthError = (res) => {
  res.status(AUTHENTICATIONERROR).send({ message: "Authorization Error" });
};

const replaceBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }
  const token = replaceBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return handleAuthError(res);
  }

  req.user = payload;
  next();
}

module.exports = { auth };
