const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItem");
const { NOTFOUND } = require("../utils/error");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res
    .status(NOTFOUND)
    .send({ message: "Error 404, Server Error, Router Not Found" });
});

module.exports = router;

//asdf
