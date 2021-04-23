// import models for sync
const {} = require('../models')

/**
 * sync sequelize models with database
 * @param {Sequelize} sequelizeInstance
 */
module.exports = async function (sequelizeInstance) {
    if (!sequelizeInstance || !sequelizeInstance.sync) {
        return
    }

    // Configuring model relationships

    // models sync
    await sequelizeInstance.sync({ alter: false })

    return sequelizeInstance
}
