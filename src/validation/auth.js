const Joi = require('joi');
const { emailRegex, passwordRegex, phoneRegex } = require('../constants/index');

const registerValidation = {
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phone: Joi.string().regex(phoneRegex).messages({ "string.pattern.base": "Invalid Phone Number" }).optional(),
        email: Joi.string().required().regex(emailRegex).messages({ "string.pattern.base": "Invalid email" }),
        gender: Joi.string().optional(),
        password: Joi.string().regex(passwordRegex).required().messages({ "string.pattern.base": "The password must be eight characters or longer and must contain at least 1 lowercase , 1 uppercase, 1 numeric and at least one special character" }),
        cPassword: Joi.any().valid(Joi.ref("password")).messages({ "any.only": "passwords is not matching" }).required(),

    })
}

const signinValidation = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
};

const updateValidation = {
    body: Joi.object().keys({
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        phone: Joi.string().regex(phoneRegex).messages({ "string.pattern.base": "Invalid Phone Number" }).optional(),
        gender: Joi.string().optional(),
    })
};

const passValidation = {
    body: Joi.object().keys({
        password: Joi.string().regex(passwordRegex).required().messages({ "string.pattern.base": "The password must be eight characters or longer and must contain at least 1 lowercase , 1 uppercase, 1 numeric and at least one special character" }),
        cPassword: Joi.any().valid(Joi.ref("password")).messages({ "any.only": "passwords is not matching" }).required(),
    })
};



module.exports = {
    registerValidation,
    signinValidation,
    updateValidation,
    passValidation,
}