// register.controller.js

// Import basic express imports
const express = require("express")
const router = express.Router()

// Import utils
const { errorResponse } = require('../utils')

// Import validators
const { registerUser } = require('../validators')

// Import service
const { UserService } = require('../services')

const postRegisterUsers = [
    async (req, res) => {
        try {
            const {
                username,
                password,
                confirmPassword,
                hasInfoId,
                firstName,
                midName,
                lastName,
                secondaryLastName,
                nationalId,
                email,
                phone,
                address
            } = req.body

            const userRegistrationToValidate = await registerUser({
                username,
                password,
                confirmPassword,
                hasInfoId,
                firstName,
                midName,
                lastName,
                secondaryLastName,
                nationalId,
                email,
                phone,
                address,
            })

            const userToRegister = {
                username: userRegistrationToValidate.username,
                password: userRegistrationToValidate.password,
                hasInfoId: userRegistrationToValidate.hasEmail || 1,
                firstName: userRegistrationToValidate.firstName,
                midName: userRegistrationToValidate.midName || '',
                lastName: userRegistrationToValidate.lastName,
                secondaryLastName: userRegistrationToValidate.secondaryLastName || '',
                nationalId: userRegistrationToValidate.nationalId,
                email: userRegistrationToValidate.email,
                phone: userRegistrationToValidate.phone || '',
                address: userRegistrationToValidate.address
            }

            await UserService.registerAdmin(userToRegister)
                .then(result => {
                    res.send(result)
                })
                .catch(error => {
                    res.send(
                        errorResponse(
                            `Error al intentar registrar usuario | Servicio de Registro usuario`,
                            error
                        )
                    )
                })
        }
        catch (message) {
            res.send(
                errorResponse(
                    'Error al intentar registrar usuario',
                    message
                )
            )
        }
    }
]

router
    .post("/", postRegisterUsers)


module.exports = router
