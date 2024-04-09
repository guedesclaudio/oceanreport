import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
  confirmPassword: Joi.string().required().min(6),
  report: Joi.boolean().required()
});

export const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(6)
});

export const loginOAuthSchema = Joi.object({
  email: Joi.string().required(),
  accessToken: Joi.string().required(),
  displayName: Joi.string().required(),
});

export const updateUserAccountSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  oldPassword: Joi.string().optional().min(6),
  newPassword: Joi.string().optional().min(6),
  confirmNewPassword: Joi.string().optional().min(6),
  report: Joi.boolean().optional(),
});