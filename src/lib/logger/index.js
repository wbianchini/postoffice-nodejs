const log4js = require('log4js')

log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
    },
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'info',
    },
  },
})

const category = process.env.NODE_ENV === 'test'
  ? 'test'
  : 'default'

const logger = log4js.getLogger(category)

module.exports = logger