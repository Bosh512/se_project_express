const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUpdateUser } = require("../middlewares/validation");

router.patch("/me", auth, validateUpdateUser, updateUser);
router.get("/me", auth, getCurrentUser);

module.exports = router;
