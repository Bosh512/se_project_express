const router = require("express").Router();
const userRouter = require("./users.js");
const { getUsers, createUser } = require("../controllers/users.js");

router.use("/users", userRouter);

module.exports = router;
