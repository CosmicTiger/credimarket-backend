const fs = require('fs')

module.exports = function () {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(__dirname + '/logs.log', 'utf8')

        let dataCount = null

        readStream
            .on('data', chunk => {
                dataCount = chunk.split('\n')
            })
            .on('end', () => {
                resolve(dataCount)
            })
            .on('error', error => {
                reject(error)
            })
    })
}
