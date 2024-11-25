const authChecker = require('./auth.middleware')
const accessRestricts = require('./access-restricts.middleware')

module.exports = {
    authChecker,
    accessRestricts
}
