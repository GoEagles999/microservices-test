module.exports = () => {
    const winston = require('winston')
    const path = require('path')
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
        /*
            - Write to all logs with level `info` and below to `combined.log` 
            - Write all logs error (and below) to `error.log`.
        */
            new winston.transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }),
            new winston.transports.File({ filename: path.join(__dirname, '../logs/combined.log') })
        ]
    })
    return logger
} 