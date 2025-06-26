const User = require("../models/user");
const { DATAINVALID, NOTFOUND, SERVERERROR } = require("../utils/error");

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
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((error) => {
      console.error(error);
      if (error.name === "ValidationError") {
        return res
          .status(DATAINVALID)
          .send({ message: "Error 400, Data Invalid" });
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
      } else if (error.name === "CastError") {
        return res
          .status(DATAINVALID)
          .send({ message: "Error 400, Data Invalid" });
      }
      return res
        .status(SERVERERROR)
        .send({ message: "Error 500, Server Error" });
    });
};

module.exports = { getUsers, createUser, getUserById };
