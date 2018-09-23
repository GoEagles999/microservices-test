const debug = require('debug')
const winston = require('./logger')()
const Redis = require('redis')

module.exports = (req, res) => {
    debug('api')
    //todo: unpack req object for logging purposes
    console.log(`getUser endpoint hit with: ${req}`)
    //todo: unpack req object for logging purposes
    winston.info('info', `getUser endpoint hit with: ${req}`)
    const publisher = Redis.createClient({host:'redis-container'})
    const subscriber = Redis.createClient({host:'redis-container'})
    publisher.publish('UserRequests', `GetUser*${req.params.id}`);
    subscriber.on('message', (channel, msg) => {
        console.log(`Received the following message from ${channel}: ${msg}`);
        const message = msg.split('*')[0]
        const data = msg.split('*')[1]
        if (message == 'UserFound') {
            publisher.quit()
            subscriber.quit()
            res.status(200).send(data)
        } 
        if (message == 'UserNotFound') {
            publisher.quit()
            subscriber.quit()
            res.status(404).end()
        }
    });
    subscriber.subscribe('UserResponses')
}