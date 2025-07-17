// const { response } = require("express");
const ClothingItem = require("../models/clothingItem");
const {
  validationError,
  serverError,
  errorNotFound,
  errorDenied,
  sendItem,
} = require("../utils/error");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => sendItem(res, item))
    .catch((error) => {
      console.error(error);
      if (error.name === "ValidationError") {
        return validationError(res);
      }
      return serverError(res);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((item) => sendItem(res, item))
    .catch((error) => {
      console.error(error);
      return serverError(res);
    });
};

// const updateItem = (req, res) => {
//   const { itemId } = req.params;
//   const { imageUrl } = req.body;
//   ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } }, { new: true })
//     .orFail()
//     .then((item) => res.status(200).send(item))
//     .catch((error) => {
//       console.error(error);
//       if (error.name === "DocumentNotFoundError") {
//         return res.status(NOTFOUND).send({ message: "Error 404, Not Found" });
//       }
//       if (error.name === "CastError") {
//         return res
//           .status(DATAINVALID)
//           .send({ message: "Error 400, Data Invalid" });
//       }
//       return res
//         .status(SERVERERROR)
//         .send({ message: "Error 500, Server Error" });
//     });
// };

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      const itemOwner = item.owner.toString();
      const userId = req.user._id.toString();
      if (itemOwner === userId) {
        ClothingItem.findByIdAndDelete(itemId)
          .orFail()
          .then((item) => sendItem(res, item))
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
      } else {
        return errorDenied(res);
      }
    })
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

const likeItem = (req, res) => {
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
        return errorNotFound(res);
      }
      if (error.name === "CastError") {
        return validationError(res);
      }
      return serverError(res);
    });
};

const dislikeItem = (req, res) => {
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
        return errorNotFound(res);
      }
      if (error.name === "CastError") {
        return validationError(res);
      }
      return serverError(res);
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
