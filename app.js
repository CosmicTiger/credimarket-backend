'use strict'

// Import vars and constants
const ApiRoutes = require('./routes')
const loaders = require('./loaders')
const { constants, db, vars } = require('./config')

async function startServer() {
    const { app, NOW } = constants
    const { PORT } = vars

    await loaders.init({
        expressApp: app,
        expressRoutes: ApiRoutes,
        sequelizeInstance: db,
    })

    app.listen(vars.PORT, err => {
        if (err) {
            console.log(err)
            return
        }

        console.log(`${NOW()} | Server running at port: ${PORT}`)
    })
}

startServer()
