const fetch = require('node-fetch')
const logger = require('../lib/logger')

const URL = `${process.env.POSTOFFICE_URL || 'https://apihom.correios.com.br'}/packet/v1/`

const headers = {
  "Content-Type": "application/json"
}

const request = async token => {
  try {
    const params = {
      "dispatchNumbers": [958]
    }

    const url = `${URL}cn38request`

    logger.info('Starting HTTP request to POST packet/v1/cn38request')

    const request = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { ...headers, Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
    return request
  } catch (err) {
    logger.error('Application excepted with: ', err)
  }
}

const requestInfo = async (token, requestId) => {
  try {
    const params = { requestId }

    const url = `${URL}cn38request`

    logger.info('Starting HTTP request to GET packet/v1/cn38request')

    const request = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { ...headers, Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
    return request
  } catch (err) {
    logger.error('Application excepted with: ', err)
  }
}

module.exports = { request, requestInfo }