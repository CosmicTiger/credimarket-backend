const { urlencoded } = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const publicIp = require('public-ip')

/**
 * Configure a express instance
 * @param {Express} app - Express instance
 * @param {Express.Route} api - Express App Routes
 * @return {Express} app
 */
module.exports = async (app, router=[]) => {
    // If not app, calcel rest execution
    if (!app) {
        console.log('not app')
        return null
    }

    app.enable('trust proxy')

    // config middlewares
    app.use(helmet())
    app.use(cors({ origin: '*' }))
    app.use(bodyParser.json())
    app.use(urlencoded({ extended: false }))

    // config routes
    app.get('/', (_, res) => res.send(await publicIp.v4()))

    // define app routes
    for (let route of routes) {
        const { path = null, controller = null } = route

        if (path && controller) {
            app.use(path, controller)
        }
    }

    return app
}
