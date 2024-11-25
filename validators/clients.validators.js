// clients.validator.js
// Import of Joi
const Joi = require('joi')
// Imports of utils functions
const { validatorErrorMessage } = require('../utils')

const ClientsValidator = {}

ClientsValidator.createClient = function (body) {
    return new Promise((resolve, reject) => {
        const schema = Joi.object({
            sysCode: Joi.string()
                .exist()
                .length(7)
                // .pattern(new RegExp('^([CC-0])\w-\w([0-9]{4})\w$'))
                .required()
                .messages({
                    'string.base': 'Debe de ingresar el código del registro',
                    'string.length': 'Ingrese un código válido de longitud',
                    // 'string.pattern.base': 'Ingrese un código válido a los patrones de código de Credimarket',
                    'any.required': 'Debe de ingresar el código Credimarket del cliente'
                }),
            firstName: Joi.string()
                .exist()
                .required()
                .messages({
                    'string.base': 'Debe de ingresar el primer nombre del cliente',
                    'string.empty': 'Debe de ingresar el primer nombre del cliente',
                    'any.required': 'Debe de ingresar el primer nombre del cliente'
                }),
            midName: Joi.string()
                .optional()
                .allow('')
                .disallow(Joi.ref('firstName'))
                .messages({
                    'string.base': 'Debe de ingresar el segundo nombre del cliente válido',
                    'any.invalid': 'El segundo nombre no puede ser igual al primero'
                }),
            lastName: Joi.string()
                .exist()
                .required()
                .messages({
                    'string.base': 'Debe de ingresar el primer apellido del cliente',
                    'string.empty': 'Debe de ingresar el primer apellido del cliente',
                    'any.required': 'Debe de ingresar el primer apellido del cliente'
                }),
            secondaryLastName: Joi.string()
                .optional()
                .allow('')
                .messages({
                    'string.base': 'Debe de ingresar el segundo apellido del cliente válido',
                }),
            nationalId: Joi.string()
                .exist()
                .length(16)
                .pattern(new RegExp('^[0-9]{3}-[0-9]{6}-[0-9]{4}[A-Z]+$'))
                .required()
                .messages({
                    'string.base': 'Debe de ingresar el cédula de identidad',
                    'string.length': 'Ingrese una cédula válida de longitud',
                    'string.pattern.base': 'Ingrese una cédula válida a los patrones de cédula del país',
                    'any.required': 'Debe de ingresar el cédula de identidad'
                }),
            phone: Joi.string()
                .optional()
                .allow('')
                .length(8)
                .pattern(/^[0-9]+$/)
                .messages({
                    'string.base': 'El número de teléfono no es válido',
                    'string.length': 'El número de teléfono no es procedente de Nicaragua',
                    'string.pattern.base': 'El número de teléfono no es válido'
                }),
            address: Joi.string()
                .min(20)
                .max(255)
                .required()
                .messages({
                    'string.base': 'Debe de ingresar el dirección de referencia',
                    'string.min': 'El dirección de referencia debe poseer mejor descripción',
                    'string.max': 'El dirección de referencia posee una descripción compleja, trate de reelmir',
                    'any.required': 'Debe de ingresar el dirección de referencia'
                }),
        })

        const { error, value } = schema.validate(body)

        if (error) {
            reject(
                validatorErrorMessage(error)
            )
        }

        resolve(value)
    })
}

module.exports = ClientsValidator
