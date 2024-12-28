const Joi = require("Joi");
const APIError = require("../utilities/errors.js");
const Response = require('../utilities/response.js');


exports.create = async (req, res, next) => {
    try {
        await Joi.object({
            name: Joi.string().required().messages({
                'string.base': 'Name must be a string',
                'string.empty': 'Name cannot be empty',
                'any.required': 'Name is required'
            }),
            owner: Joi.string().required().messages({
                'string.base': 'Owner must be a string',
                'string.empty': 'Owner cannot be empty',
                'any.required': 'Owner is required'
            }),
            memberList: Joi.array().required().messages({
                'array.base': 'Member list must be an array',
                'any.required': 'Member list is required'
            }),
            resolved: Joi.boolean().required().messages({
                'boolean.base': 'Resolved must be a boolean',
                'any.required': 'Resolved is required'
            }),
            itemList: Joi.array().required().messages({
                'array.base': 'Item list must be an array',
                'any.required': 'Item list is required'
            })
        }).messages({
            'object.base': 'Cart must be an object',
            'any.required': 'Missing required fields'
        }).validateAsync(req.body);
    } catch (error) {
        //console.log("asdf",error);
        res.message = error;
        return new Response(req.body, error).error400(res);
        //throw new APIError(`Validation create error: ${error}`, 400);
        // console.log("detail:", error.details)
        // console.log("detail[0]:", error.details[0].message)
        //if (error.details && error?.details[0].message) throw new APIError(error.details[0].message, 400);
        //else throw new APIError("Validation error", 400);
    }
    next();
}

exports.update = async (req, res, next) => {
    try {
        await Joi.object({
            _id: Joi.string().required(),
            name: Joi.string().messages({
                'string.base': 'Name must be a string',
                'string.empty': 'Name cannot be empty',
            }),
            owner: Joi.string().messages({
                'string.base': 'Owner must be a string',
                'string.empty': 'Owner cannot be empty',
            }),
            memberList: Joi.array().messages({
                'array.base': 'Member list must be an array',
            }),
            resolved: Joi.boolean().messages({
                'boolean.base': 'Resolved must be a boolean',
            }),
            itemList: Joi.array().messages({
                'array.base': 'Item list must be an array',
            })
        }).messages({
            'object.base': 'Cart must be an object',
            'any.required': 'Missing required fields'
        }).validateAsync(req.body);
    } catch (error) {
        //console.log("asdf",error);
        res.message = error;
        return new Response(req.body, error).error400(res);
        //throw new APIError(`Validation update error: ${error}`, 400);
        // console.log("detail:", error.details)
        // console.log("detail[0]:", error.details[0].message)
        //if (error.details && error?.details[0].message) throw new APIError(error.details[0].message, 400);
        //else throw new APIError("Validation error", 400);
    }
    next();
}