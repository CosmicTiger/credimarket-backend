// index.js - routes
// Imports controllers
const clients = require('../controllers/clients.controller')
const login = require('../controllers/login.controller')
const register = require('../controllers/register.controller')

// Imports middlewares
const { authChecker } = require('../middlewares')

const { auth, authRoot, authMixedUser } = authChecker

const ApiRoutes = [
    { path: '/login', controller: login },
    { path: '/register', controller: register },
    { path: '/clients', controller: [authRoot, clients] }
]

module.exports = ApiRoutes
