const requestPackage = require('./packages')
const requestUnit = require('./units')

const {
  request: requestCn38,
   requestInfo: requestInfoCn38
} = require('./cn38')

module.exports = {
  requestPackage,
  requestUnit,
  requestCn38,
  requestInfoCn38,
}