// validators - index.js
const loginUser = require('./login.validators')
const registerUser = require('./register.validators')
const ClientsValidator = require('./clients.validators')

module.exports = {
    loginUser,
    registerUser,
    ClientsValidator,
}
