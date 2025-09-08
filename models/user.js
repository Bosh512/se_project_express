const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator(value) {
        if (!value) return true;
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email",
    },
  },
  password: { type: String, required: true, select: false },
});

userSchema.pre("save", async function (next) {
  if (
    this.password.startsWith("$2b$") ||
    this.password.startsWith("$2a$") ||
    this.password.startsWith("$2y$")
  ) {
    next();
    return;
  }
  if (this.isModified("password") || this.isNew()) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const error = new Error("Incorrect email or password");
        error.code = 401;
        return Promise.reject(error);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const error = new Error("Incorrect email or password");
          error.code = 401;
          return Promise.reject(error);
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
