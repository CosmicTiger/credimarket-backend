// clients.controller.js
// Imports of express.js
const express = require('express')
const router = express.Router()

// Imports utility functions
const { errorResponse } = require('../utils')

// Validator functions
const { ClientsValidator } = require('../validators')

// Imports services
const { ClientsService } = require('../services')

const postCreateClient = [
    async (req, res) => {
        try {
            const {
                sysCode,
                firstName,
                midName,
                lastName,
                secondaryLastName,
                nationalId,
                phone,
                address,
            } = req.body

            const clientRegistrationToValidate = await ClientsValidator.createClient({
                sysCode,
                firstName,
                midName,
                lastName,
                secondaryLastName,
                nationalId,
                phone,
                address,
            })

            const clientToRegister = {
                sysCode: clientRegistrationToValidate.sysCode,
                firstName: clientRegistrationToValidate.firstName,
                midName: clientRegistrationToValidate.midName || '',
                lastName: clientRegistrationToValidate.lastName,
                secondaryLastName: clientRegistrationToValidate.secondaryLastName || '',
                nationalId: clientRegistrationToValidate.nationalId,
                phone: clientRegistrationToValidate.phone,
                address: clientRegistrationToValidate.address,
            }

            await ClientsService.create(clientToRegister)
                .then(result => {
                    res.send(result)
                })
                .catch(error => {
                    res.send(
                        errorResponse(
                            'Error al intentar registrar cliente | Servicio de Registro Credi cliente',
                            error
                        )
                    )
                })

            res.send({
                response: 'success',
                clientToRegister
            })

        } catch (message) {
            res.send(
                errorResponse(
                    'Ha sucedido un problema al crear al credi cliente',
                    message
                )
            )
        }
    }
]

router
    .post('/', postCreateClient)
    .get('/all')
    .get('/:client_id')
    .patch('/:client_id')

module.exports = router
