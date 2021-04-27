const dotenv = require('dotenv')

// loading vars from .env
dotenv.config()

module.exports = {
    PORT: process.env.PORT || 8080,
    PASSWORD_SECRET: process.env.PASSWORDSECRET || 'secret',
    JWT_SECRET: process.env.JWTSECRET || 'secret',
    JWT_SECRET_ADMIN: process.env.JWTSECRETADMIN || 'secret',
    DB: {
        NAME: process.env.DBNAME,
        HOST: process.env.DBHOST || 'localhost',
        USERNAME: process.env.DBUSERNAME,
        PASSWORD: process.env.DBPASSWORD,
        DIALECT: process.env.DBDIALECT || 'mysql',
    },
}
