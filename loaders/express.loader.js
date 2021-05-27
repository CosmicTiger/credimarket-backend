const { urlencoded, json } = require('express')
const cors = require('cors')
const helmet = require('helmet')
const publicIp = require('public-ip')
const { morganDeployment } = require('../config/constants.config')

/**
 * Configure a express instance
 * @param {Express} app - Express instance
 * @param {Express.Route} api - Express App Routes
 * @return {Express} app
 */
module.exports = async (app, router = []) => {
    // If not app, calcel rest execution
    if (!app || !Array.isArray(router)) {
        console.log('not app')
        return null
    }

    app.enable('trust proxy')

    // config middlewares
    app.use(helmet())
    app.use(cors({ origin: '*' }))

    // User for parse get json petition
    app.use(json())
    app.use(urlencoded({ extended: true }))

    morganDeployment()

    // config routes
    app.get('/', async (_, res) => res.send(await publicIp.v4()))

    // define app routes
    for (let route of router) {
        const { path = null, controller = null } = route

        if (path && controller) {
            app.use(path, controller)
        }
    }

    return app
}
