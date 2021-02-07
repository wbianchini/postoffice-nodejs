const { encode } = require('base-64');
const fetch = require('node-fetch')
const logger = require('../lib/logger')

const URI = `${process.env.POSTOFFICE_URL || 'https://apihom.correios.com.br'}/token/v1/`

const credentials = {
  username: process.env.POSTOFFICE_USERNAME || `testeint`,
  password: process.env.POSTOFFICE_PASSWORD || `123456`,
  postalCard: process.env.POSTOFFICE_POSTALCARD || `0073423777`,
}

const headers = {
  "Content-Type": "application/json",
  Authorization: 'Basic ' + encode(`${credentials.username}:${credentials.password}`),
}

const retrieveToken = response => {
  if (!response.token) {
    logger.error(response)
    throw "Could not retrieve token"
  }
  logger.info('Succefull credentials exchange for Bearear token')
  return response.token
}

const handshake = async () => {
  try {
    logger.info('Initializing attempt to hankshake process')
    const url = `${URI}autentica/cartaopostagem`

    const request = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ "numero": credentials.postalCard }),
      headers: { ...headers }
    })
      .then(response => response.json())
      .then(retrieveToken)

    return request
  } catch (err) {
    logger.error('Application excepted with: ', err)
  }
}

module.exports = handshake