const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItem");
const { errorNotFound } = require("../utils/error");
const { login, createUser } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  return errorNotFound(res);
});

module.exports = router;
