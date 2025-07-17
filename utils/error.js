const DATAINVALID = 400;
const NOTFOUND = 404;
const SERVERERROR = 500;
const CONFLICTERROR = 409;
const AUTHENTICATIONERROR = 401;
const FORBIDDEN = 403;

const OK = 200;

// FOR CONTROLLERS

const validationError = (res) =>
  res.status(DATAINVALID).send({ message: "Error 400, Data Invalid" });

const serverError = (res) =>
  res.status(SERVERERROR).send({ message: "Error 500, Server Error" });

const errorNotFound = (res) =>
  res.status(NOTFOUND).send({ message: "Error 404, Not Found" });

const errorDenied = (res) =>
  res.status(FORBIDDEN).send({ message: "Error 403, Request Denied" });

const conflictError = (res) =>
  res.status(CONFLICTERROR).send({ message: "Error 409, Data Conflicting" });

const authenticationError = (res) =>
  res
    .status(AUTHENTICATIONERROR)
    .send({ message: "Error 401, Authentication Error" });

const sendItem = (res, item) => res.status(OK).send(item);

const sendUser = (res, user) => res.status(OK).send(user);

const sendUsers = (res, users) => res.status(OK).send(users);

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
