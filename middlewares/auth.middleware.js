// auth.middleware.js
const log = require('../config/logs.config')

const {
    decodeUserToken,
    decodeAdminToken,
    decodeMixedToken
} = require('../config/constants.config')

module.exports = {
    auth: async (req, res, next) => {
        const token = req.header('x-auth-token')

        try {
            req.user = await decodeUserToken(token)
            next()
        } catch (error) {
            log(`auth.middleware.js - error en token de autenticación | ${error}`)

            return res.status(401).json({
                error: true,
                message: String('Tu sesión ha caducado'),
            })
        }
    },

    authRoot: async (req, res, next) => {
        const token = req.header('x-auth-token')

        try {
            req.user = await decodeAdminToken(token)
            next()
        } catch (error) {
            log(`auth.middleware.js - error en token de autenticación | ${error}`)

            return res.status(401).json({
                error: true,
                message: error.toString(),
            })
        }
    },
    authMixedUser: async (req, res, next) => {
        const token = req.header('x-auth-token')
        try {
            req.user = await decodeMixedToken(
                decodeAdminToken(token),
                decodeUserToken(token)
            )

            next()
        } catch (message) {
            log(`auth.js | error in mixed user auth | ${message}`)

            return res.status(401).json({
                error: true,
                message,
            })
        }
    },
}
