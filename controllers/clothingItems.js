// const { response } = require("express");
const ClothingItem = require("../models/clothingItem");
const { sendItem } = require("../utils/SendCodes");
const { ValidationError } = require("../utils/ValidationError");
const { ServerError } = require("../utils/ServerError");
const { NotFoundError } = require("../utils/NotFoundError");
const { DeniedError } = require("../utils/DeniedError");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => sendItem(res, item))
    .catch((error) => {
      console.error(error);
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

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((item) => sendItem(res, item))
    .catch((error) => {
      console.error(error);
      return next(
        new ServerError("There was an error with the server. Error Code 500")
      );
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      const itemOwner = item.owner.toString();
      const userId = req.user._id.toString();
      if (itemOwner === userId) {
        sendItem(res, item);
        return ClothingItem.findByIdAndDelete(itemId);
      }
      return next(new DeniedError("The request was denied. Error Code 403."));
    })
    .catch((error) => {
      console.error(error);
      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Not found. Error Code 404."));
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

const likeItem = (req, res, next) => {
  console.log("Like Fired");
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => sendItem(res, item))
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

const dislikeItem = (req, res, next) => {
  console.log("Dislike Fired");
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => sendItem(res, item))
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

module.exports = {
  getItems,
  createItem,
  // updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
