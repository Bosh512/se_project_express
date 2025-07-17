const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const {
  validationError,
  conflictError,
  serverError,
  errorNotFound,
  authenticationError,
  sendUser,
  sendUsers,
  AUTHENTICATIONERROR,
} = require("../utils/error");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => sendUsers(res, users))
    .catch((error) => {
      console.error(error);
      return serverError(res);
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.create({ name, avatar, email, password })
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      res.status(201).send({ userObject });
    })
    .catch((error) => {
      console.error(error);
      if (error.name === "ValidationError") {
        return validationError(res);
      }
      if (error.code === 11000) {
        return conflictError(res);
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
        return errorNotFound(res);
      }
      if (error.name === "CastError") {
        return validationError(res);
      }
      return serverError(res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  console.log("JWT_SECRET:", JWT_SECRET);
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((error) => {
      console.error(error);
      if (error.code === 401) {
        return authenticationError(res);
      }
      if (error.name === "DocumentNotFoundError") {
        return errorNotFound(res);
      }
      if (error.name === "CastError") {
        return validationError(res);
      }
      if (error.name === "ValidationError") {
        return validationError(res);
      }
      if (email === undefined || password === undefined) {
        return validationError(res);
      }
      return serverError(res);
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, avatar }, { new: true })
    .orFail()
    .then((user) => sendUser(res, user))
    .catch((error) => {
      console.error(error);
      if (error.name === "DocumentNotFoundError") {
        return errorNotFound(res);
      }
      if (error.name === "CastError") {
        return validationError(res);
      }
      if (error.name === "ValidationError") {
        return validationError(res);
      }
      return serverError(res);
    });
};

module.exports = { getUsers, getCurrentUser, login, createUser, updateUser };
