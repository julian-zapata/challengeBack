// validaciones para los elementos de la tienda
import { isError } from "joi";
import Joi = require("joi")

export const paramStoreValidate = Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    address: Joi.string().min(10).max(50).required(),
})

