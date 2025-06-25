const router = require("express").Router();
const { createItem } = require("../controllers/clothingItems.js");

router.post("/", createItem);

module.exports = router;
