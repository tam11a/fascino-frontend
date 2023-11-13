import Joi from "joi";

export const updatePasswordResolver = Joi.object({
  phone: Joi.string().required(),
  currentPassword: Joi.string().label("Current Password").required(),
  password: Joi.string().label("Password").required().min(6),
  cpassword: Joi.any()
    .label("Confirm New Password")
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match.",
    }),
});

export const resetPasswordResolver = Joi.object({
  password: Joi.string().label("Password").required().min(6),
  cpassword: Joi.any()
    .label("Confirm New Password")
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match.",
    }),
});
