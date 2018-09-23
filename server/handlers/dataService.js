const debug = require('debug')
const winston = require('./logger')()
const Redis = require('redis')
const csv = require('csvtojson')
const fs = require('fs')

module.exports = async () => {
    debug('redis')
    winston.info(
        'info',
        `redis data service starting`
    )
    const data = await csv().fromFile('../data/user_data.csv')
    const publisher = Redis.createClient({host:'redis-container'})
    const subscriber = Redis.createClient({host:'redis-container'})
    subscriber.on('message', (channel, msg) => {
        console.log(`Received the following message from ${channel}: ${msg}`);
        const message = msg.split('*')[0]
        const userID = msg.split('*')[1]
        if (message == 'GetUser' && userID >= 0 && userID <= 1000) {
            // subtract 1 from userID to account for data header row in CSV
            return publisher.publish('UserResponses', `UserFound*${JSON.stringify(data[userID-1])}`)
        } else {
            publisher.publish('UserResponses', `UserNotFound`)
        }
    });
    subscriber.subscribe('UserRequests')
}