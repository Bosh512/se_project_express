const router = require("express").Router();
const userRouter = require("./users.js");
const { getUsers, createUser } = require("../controllers/users.js");
const itemRouter = require("./clothingItem.js");
const { DATAINVALID, NOTFOUND, SERVERERROR } = require("../utils/error.js");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res
    .status(SERVERERROR)
    .send({ message: "Error 500, Server Error, Router Not Found" });
});

module.exports = router;
