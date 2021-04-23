const expressLoader = require('./express.loader')
const sequelizeLoader = require('./sequelize.loader')

module.exports = {
    async init({
        expressApp = null,
        expressRoutes = null,
        sequelizeInstance = null,
    }) {
        await expressLoader(expressApp, expressRoutes)
        await sequelizeLoader(sequelizeInstance)
    },
}
