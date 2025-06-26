const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItem");
const { SERVERERROR } = require("../utils/error");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res
    .status(SERVERERROR)
    .send({ message: "Error 500, Server Error, Router Not Found" });
});

module.exports = router;
