// clients.controller.js
// Imports of express.js
const express = require('express')
const router = express.Router()

// Imports utility functions
const { errorResponse } = require('../utils')

// Validator functions
// const { createClient, updateClient, disableClient } = require('../validators')

// Imports services
const { ClientService } = require('../services')

const postCreateClient = [
    async (req, res) => {
        try {

        } catch (message) {
            errorResponse(
                'Ha sucedido un problema al crear al credi cliente',
                message
            )
        }
    }
]

router
    .get('/:client_id')
    .get('/all')
    .post('/')
    .patch('/:client_id')

module.exports = router
