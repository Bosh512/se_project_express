const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const {
  validateItem,
  validateCreateItem,
} = require("../middlewares/validation");

router.get("/", getItems);
router.post("/", validateCreateItem, auth, createItem);
router.delete("/:itemId", validateItem, auth, deleteItem);
router.put("/:itemId/likes", validateItem, auth, likeItem);
router.delete("/:itemId/likes", validateItem, auth, dislikeItem);

module.exports = router;
