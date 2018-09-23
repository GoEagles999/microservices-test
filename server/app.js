const getUser = require('./handlers/getUser')
const startDataService = require('./handlers/dataService')
const winston = require('./handlers/logger')

class Server {
    constructor() {
        this.express = this.getExpressApp()
        this.registerEndpoints()
        this.initDataService()
        this.initExpress()
    }
    getExpressApp() {
        return require('express')()
    }
    registerEndpoints() {
        this.express.get(
            '/getUser/:id',
            getUser
        )
        this.express.get(
            '/getUser',
            (req, res) => {
                res.status(404).end()
            })
    }
    initDataService() {
        startDataService()
    }
    initExpress() {
        this.express.listen(
            3000,
            () => {
                console.log(`server listening on port 3000`)
            }
        )
    }
}

new Server()

module.exports = Server