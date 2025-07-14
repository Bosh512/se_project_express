const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUserById,
  login,
} = require("../controllers/users");
const { auth } = require("../middlewares/auth.js");

router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
