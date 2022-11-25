import Joi from "joi";


export const authSignInSchema =  Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(20),
});


export const authSignUpSchema = authSignInSchema.keys({
    username: Joi.string().min(5).required()
});