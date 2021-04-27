const { register } = require('../controllers')

const ApiRoutes = [
    { path: '/register', controller: register },
]

module.exports = ApiRoutes
