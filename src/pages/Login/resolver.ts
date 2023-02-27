import Joi from "joi";

export const loginResolver = Joi.object({
	email: Joi.string()
		.label("Email")
		.pattern(
			/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		)
		.required()
		.messages({
			"string.pattern.base": "Invalid Email",
		}),
	password: Joi.string().label("Password").min(6).required(),
	remember: Joi.boolean().default(true),
});
