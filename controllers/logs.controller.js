const fs = require('fs')
const express = require('express')
const router = express.Router()

// import middleware
const { authRoot } = require('../middlewares')

router.get('/', authRoot, async (_, res) => {
    try {
        const readStream = fs.createReadStream(__dirname + "/logs.log", "utf8")

        let dataCount = null

        readStream.on('data', (chunk) => {
            dataCount = chunk.split("\n")
        }).on('end', () => {
            res.send(dataCount)
        })

    } catch (message) {
        res.send({ error: true, message })
    }
})

module.exports = router
