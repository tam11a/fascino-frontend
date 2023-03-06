import Joi from "joi";

export const userInfoResolver = Joi.object({
	phone: Joi.string().label("Phone Number"),
	firstName: Joi.string().label("First Name").required(),
	lastName: Joi.string().label("Last Name").required(),
	email: Joi.string().label("Email").required(),
	address: Joi.string().label("Address").required(),
	roleID: Joi.number().label("Role Id").allow(null),
	isActive: Joi.boolean().default(true),
	userName: Joi.string(),
});
