const DATAINVALID = 400;
const NOTFOUND = 404;
const SERVERERROR = 500;
const CONFLICTERROR = 409;
const AUTHENTICATIONERROR = 401;
const FORBIDDEN = 403;

const OK = 200;

// FOR CONTROLLERS

const validationError = (res) => {
  return res.status(DATAINVALID).send({ message: "Error 400, Data Invalid" });
};

const serverError = (res) => {
  return res.status(SERVERERROR).send({ message: "Error 500, Server Error" });
};

const errorNotFound = (res) => {
  return res.status(NOTFOUND).send({ message: "Error 404, Not Found" });
};

const errorDenied = (res) => {
  return res.status(FORBIDDEN).send({ message: "Error 403, Request Denied" });
};

const conflictError = (res) => {
  return res
    .status(CONFLICTERROR)
    .send({ message: "Error 409, Data Conflicting" });
};

const authenticationError = (res) => {
  return res
    .status(AUTHENTICATIONERROR)
    .send({ message: "Error 401, Authentication Error" });
};

const sendItem = (res, item) => {
  return res.status(OK).send(item);
};

const sendUser = (res, user) => {
  return res.status(OK).send(user);
};

const sendUsers = (res, users) => {
  return res.status(OK).send(users);
};

module.exports = {
  DATAINVALID,
  NOTFOUND,
  SERVERERROR,
  CONFLICTERROR,
  AUTHENTICATIONERROR,
  FORBIDDEN,
  OK,
  validationError,
  serverError,
  errorNotFound,
  errorDenied,
  authenticationError,
  sendItem,
  sendUser,
  sendUsers,
  conflictError,
};
