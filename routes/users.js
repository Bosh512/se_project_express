const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUser } = require("../middlewares/validation");

router.patch("/me", auth, updateUser);
router.get("/me", validateUser, auth, getCurrentUser);

module.exports = router;
