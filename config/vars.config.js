const dotenv = require('dotenv')
const DB_DIALECT = 'mysql'

// loading vars from .env
if (process.env.NODE_ENV !== 'production') dotenv.config()

const {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USERNAME,
    JWT_SECRET,
    JWT_SECRET_ADMIN,
    PASSWORD_SECRET,
    PORT,
} = process.env

const CREDIMARKET_ROLES = {
    ROOT: 1,
    ADMIN: 2,
    MANAGER: 3,
    SUPERVISOR: 4,
    LENDER: 5
}

module.exports = {
    PORT: PORT || 8080,
    PASSWORD_SECRET: PASSWORD_SECRET || 'secret',
    JWT_SECRET: JWT_SECRET || 'secret',
    JWT_SECRET_ADMIN: JWT_SECRET_ADMIN || 'secret',
    DB: {
        NAME: DB_NAME,
        HOST: DB_HOST || 'localhost',
        USERNAME: DB_USERNAME,
        PASSWORD: DB_PASSWORD,
        DIALECT: DB_DIALECT || 'mysql',
    },
    PRODUCTION: process.env.NODE_ENV === 'production',
    CREDIMARKET_ROLES
}
