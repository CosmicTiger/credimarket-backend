const { Sequelize } = require('sequelize')
const { DB: dbConfig } = require('./vars.config')

/**
 * Make a sequelize instance
 * @param {String} username - database user
 * @param {String} password - database password
 * @param {String} database - database name
 * @param {String} host - database server host
 * @param {String} dialect - database type
 */
module.exports = new Sequelize(dbConfig.NAME, dbConfig.USERNAME, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    define: {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    },
})
