const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a text value.",
      "string.empty": "Email is required and cannot be empty.",
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is a required field.",
    }),
    password: Joi.string().required().messages({
      "string.base": "Password must be a text value.",
      "string.empty": "Password cannot be empty.",
      "any.required": "Password is a required field.",
    }),
  }),
});

const validateUserLogIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a text value.",
      "string.empty": "Email is required and cannot be empty.",
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is a required field.",
    }),
    password: Joi.string().required().messages({
      "string.base": "Password must be a text value.",
      "string.empty": "Password cannot be empty.",
      "any.required": "Password is a required field.",
    }),
  }),
});

const validateUser = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required().messages({
      "string.base": "ID must be a text value.",
      "string.empty": "ID cannot be empty.",
      "string.length": "ID must be exactly 24 characters long.",
      "string.hex": "ID must contain only hexadecimal characters (0-9, a-f).",
      "any.required": "ID is a required field.",
    }),
  }),
});

const validateItem = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required().messages({
      "string.base": "ID must be a text value.",
      "string.empty": "ID cannot be empty.",
      "string.length": "ID must be exactly 24 characters long.",
      "string.hex": "ID must contain only hexadecimal characters (0-9, a-f).",
      "any.required": "ID is a required field.",
    }),
  }),
});

const validateCreateItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

module.exports = {
  validateUser,
  validateUserLogIn,
  validateCreateUser,
  validateItem,
  validateCreateItem,
};
