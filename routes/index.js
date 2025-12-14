const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItem");
const { NotFoundError } = require("../utils/NotFoundError");
const { login, createUser } = require("../controllers/users");
const {
  validateUserLogIn,
  validateCreateUser,
} = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.post("/signin", validateUserLogIn, login);
router.post("/signup", validateCreateUser, createUser);

router.use((req, res, next) => next(new NotFoundError("Route not found")));

module.exports = router;
