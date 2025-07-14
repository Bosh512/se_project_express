const user = require("../models/user");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  DATAINVALID,
  NOTFOUND,
  SERVERERROR,
  CONFLICTERROR,
  AUTHENTICATIONERROR,
} = require("../utils/error");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((error) => {
      console.error(error);
      return res
        .status(SERVERERROR)
        .send({ message: "Error 500, Server Error" });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.create({ name, avatar, email, password })
    .then((user) => res.status(201).send(user))
    .catch((error) => {
      console.error(error);
      if (error.name === "ValidationError") {
        return res
          .status(DATAINVALID)
          .send({ message: "Error 400, Data Invalid" });
      }
      if (error.code === 11000) {
        return res
          .status(CONFLICTERROR)
          .send({ message: "Error 409, Data Conflicting" });
      }
      return res
        .status(SERVERERROR)
        .send({ message: "Error 500, Server Error" });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      console.error(error);
      if (error.name === "DocumentNotFoundError") {
        return res.status(NOTFOUND).send({ message: "Error 404, Not Found" });
      }
      if (error.name === "CastError") {
        return res
          .status(DATAINVALID)
          .send({ message: "Error 400, Data Invalid" });
      }
      return res
        .status(SERVERERROR)
        .send({ message: "Error 500, Server Error" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((error) => {
      res
        .status(AUTHENTICATIONERROR)
        .send({ message: "Error 401, Authentication Error" });
    });
};

module.exports = { getUsers, getUserById, login, createUser };
