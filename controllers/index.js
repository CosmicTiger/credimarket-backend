const express = require('express')
const router = express.Router()

const login = require('./login.controller')
const register = require('./register.controller')

router.use(login)
router.use(register)

module.exports = router
