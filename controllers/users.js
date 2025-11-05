const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const {
  ValidationError,
  ServerError,
  NotFoundError,
  DeniedError,
  ConflictError,
  AuthenticationError,
  sendUser,
} = require("../utils/error");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.create({ name, avatar, email, password })
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(201).send({ token, user: userObject });
    })
    .catch((error) => {
      console.error(error);
      if (error.name === "ValidationError") {
        return next(
          new ValidationError("Invalid data provided. Error Code 400.")
        );
      }
      if (error.code === 11000) {
        return next(
          new ConflictError(
            "The inputed data conflicts with data already in the database. Error Code 409 11000."
          )
        );
      }
      return serverError(res);
    });
};

const getCurrentUser = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => sendUser(res, user))
    .catch((error) => {
      console.error(error);
      if (error.name === "DocumentNotFoundError") {
        return next(NotFoundError("Not found. Error Code 404."));
      }
      if (error.name === "CastError") {
        return next(
          new ValidationError("Invalid data provided. Error Code 400.")
        );
      }
      return next(
        new ServerError("There was an error with the server. Error Code 500")
      );
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return validationError(res);
  }
  console.log("JWT_SECRET:", JWT_SECRET);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((error) => {
      console.error(error);
      if (error.code === 401) {
        return next(
          new AuthenticationError(
            "The data could not be authenticated. Error Code 401."
          )
        );
      }
      if (error.name === "CastError") {
        return next(
          new ValidationError("Invalid data provided. Error Code 400.")
        );
      }
      if (error.name === "ValidationError") {
        return next(
          new ValidationError("Invalid data provided. Error Code 400.")
        );
      }
      return next(
        new ServerError("There was an error with the server. Error Code 500")
      );
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => sendUser(res, user))
    .catch((error) => {
      console.error(error);
      if (error.name === "DocumentNotFoundError") {
        return next(NotFoundError("Not found. Error Code 404."));
      }
      if (error.name === "CastError") {
        return next(
          new ValidationError("Invalid data provided. Error Code 400.")
        );
      }
      if (error.name === "ValidationError") {
        return next(
          new ValidationError("Invalid data provided. Error Code 400.")
        );
      }
      return next(
        new ServerError("There was an error with the server. Error Code 500")
      );
    });
};

module.exports = { getCurrentUser, login, createUser, updateUser };
