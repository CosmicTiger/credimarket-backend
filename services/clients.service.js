// clients.service.js
// Import sequelize
const { col } = require('sequelize')

// Import middlewares
const jwt = require('jsonwebtoken')
const _ = require('lodash')

// Import config functions
const { NOW } = require('../config/constants.config')

// Import utils
const { erroResponse, errorResponse } = require('../utils')

// Import models
const {
    ClientsModel,
    ClientsAddressModel,
} = require('../models')

// Creation of Service for Clients
const ClientsService = {}

/**
 * @author CosmicTiger - Luisangel Marcia
 * @summary Create method for Credi Clients
 * @param {Object.String} sysCode - system code for each client in credimarket
 * @param {Object.String} firstName - first name of the client
 * @param {Object.String} midName - mid name of the client if he writes it
 * @param {Object.String} lastName - last name of the client
 * @param {Object.String} secondaryLastName - secondary last name from people from latin american countries
 * @param {Object.String} nationalId - national identification of the country
 * @param {Object.String} phone - personal phone number from client
 * @param {Object.String} address - personal reference of the address from client
 */
ClientsService.create = function ({
    sysCode,
    firstName,
    midName = null,
    lastName,
    secondaryLastName = null,
    nationalId,
    phone,
    address,
}) {
    return new Promise(async (resolve, reject) => {
        try {
            const clientRegistration = ClientsModel.create({
                sys_code: sysCode,
                first_name: firstName,
                mid_name: midName,
                last_name: lastName,
                secondary_last_name: secondaryLastName,
                national_id: nationalId,
                phone,
                status_id: 1,
                created_at: NOW(),
            })

            const client_id = clientRegistration.get('id')

            if (!client_id) {
                throw String('El cliente no ha logrado crearse')
            }

            const addressToRelatedClient = await ClientsAddressModel.create({
                client_id,
                status_id: 1,
                personal_reference: address,
                created_at: NOW()
            })

            if (!addressToRelatedClient) {
                await ClientsModel.delete({
                    where: { id: client_id }
                })
                    .then(_ => {
                        resolve({
                            response: 'warning',
                            message: 'Usuario no pudo crearse por algún error en el servicio'
                        })
                    })
                    .catch(error => {
                        errorResponse(
                            'No se pudo revocar inserción de usuario por mal proceso',
                            error
                        )
                    })
            }

            resolve({
                response: 'success',
                message: 'El credi cliente ha sido creado con éxito'
            })

        } catch (error) {
            errorResponse(
                'Sucedio un error durante el proceso de registro',
                `ClientsService.create: ${error}`
            )
        }
    })
}

module.exports = ClientsService
