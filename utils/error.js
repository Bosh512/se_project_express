class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class DeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

const sendItem = (res, item) => res.status(OK).send(item);

const sendUser = (res, user) => res.status(OK).send(user);

module.exports = {
  ValidationError,
  ServerError,
  NotFoundError,
  DeniedError,
  ConflictError,
  AuthenticationError,
  sendItem,
  sendUser,
};
