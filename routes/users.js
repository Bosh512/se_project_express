const router = require("express").Router();
const {
  createUser,
  getCurrentUser,
  login,
  updateUser,
} = require("../controllers/users");
const { auth } = require("../middlewares/auth.js");

router.patch("/users/me", auth, updateUser);
router.get("/users/me", auth, getCurrentUser);
router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
