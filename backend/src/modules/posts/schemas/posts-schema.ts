import Joi from "joi";

export const createPostSchema: Joi.ObjectSchema<{title: string, content: string}> = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required()
});

export const deletePostSchema: Joi.ObjectSchema<{postId: number}> = Joi.object({
  postId: Joi.number().required().min(0),
});