const dotenv = require('dotenv')
const DBDIALECT = 'mysql'

// loading vars from .env
if (process.env.NODE_ENV !== 'production') dotenv.config()

const {
    DBHOST,
    DBNAME,
    DBPASSWORD,
    DBUSERNAME,
    JWTSECRET,
    JWTSECRETADMIN,
    PASSWORDSECRET,
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
    PASSWORD_SECRET: PASSWORDSECRET || 'secret',
    JWT_SECRET: JWTSECRET || 'secret',
    JWT_SECRET_ADMIN: JWTSECRETADMIN || 'secret',
    DB: {
        NAME: DBNAME,
        HOST: DBHOST || 'localhost',
        USERNAME: DBUSERNAME,
        PASSWORD: DBPASSWORD,
        DIALECT: DBDIALECT || 'mysql',
    },
    PRODUCTION: process.env.NODE_ENV === 'production',
    CREDIMARKET_ROLES
}
