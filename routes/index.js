const router = require("express").Router();
const userRouter = require("./users.js");
const { getUsers, createUser } = require("../controllers/users.js");
const itemRouter = require("./clothingItem.js");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
