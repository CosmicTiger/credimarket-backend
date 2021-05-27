const log = require('../config/logs.config')

const { decrypt } = require()

module.exports = {
    auth: async (req, res, next) => {
        const token = req.header('x-auth-token')

        try {
            req.user = await decodeUserToken(token)
            next()
        } catch (error) {
            log(`auth.js - error en token de autenticación | ${error}`)

            return res.status(401).json({
                error: true,
                message: String('Tu sesión ha caducado'),
            })
        }
    },

    authRoot: async (req, res, next) => {
        const token = req.header('x-auth-token')

        try {
            req.user = await decodeUserToken(token)
            next()
        } catch (error) {
            log(`auth.js - error en token de autenticación | ${error}`)

            return res.status(401).json({
                error: true,
                message: error.toString(),
            })
        }
    }
}
