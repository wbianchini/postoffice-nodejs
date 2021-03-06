const initializeCommunication = require("./src/resources/client")
const handleResponse = require("./src/lib/handlers/response")
const logger = require("./src/lib/logger")

const { requestPackage, requestUnit, requestCn38 } = require("./src/resources")

const handleCommunicationError = (err) => {
  logger.error("Communication error", err)
}

const package = async (event, context) => {
  logger.info("Start handling `package` event.")
  logger.info(context)
  const response = await initializeCommunication()
    .then((token) => requestPackage(token, event))
    .then(handleResponse)
    .catch(handleCommunicationError)

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}

const unit = async (event, context) => {
  logger.info(context)
  const response = await initializeCommunication()
    .then(requestUnit)
    .then(handleResponse)
    .catch(handleCommunicationError)

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}

const cn38 = async (event, context) => {
  logger.info(context)
  const response = await initializeCommunication()
    .then(requestCn38)
    .then(handleResponse)
    .catch(handleCommunicationError)

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}

module.exports = { package, unit, cn38 }
