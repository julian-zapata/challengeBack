import Joi = require("joi")

//validacion para ingresar cupones
export const couponValidate = Joi.object().keys({
    code: Joi.string().alphanum().uppercase().required().length(8)
})

//validacion de email
export const emailValidate = Joi.object().keys({
    email: Joi.string().email().required()
})

export const paramStoreValidate = Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    address: Joi.string().min(10).max(50).required(),
})

