// loan.controller.js
// Imports of express.js
const express = require('express')
const router = express.Router()

// Imports of utils
const { errorResponse } = require('../utils')

const postCreateLoan = [
    async (req, res) => {
        try {

        } catch (message) {
            res.send(
                errorResponse(
                    message
                )
            )
        }
    }
]

router.post('/create', postCreateLoan)

module.exports = router
