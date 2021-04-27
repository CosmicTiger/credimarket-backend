'use strict'
const express = require('express')
const ApiRoutes = require('./routes')
const loaders = require('./loaders')
const { vars, db } = require('./config')

async function startServer() {
    const app = express()

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

        console.log(`Server running at port: ${vars.PORT}`)
    })
}

startServer()
