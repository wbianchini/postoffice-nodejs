const fetch = require('node-fetch')
const logger = require('../lib/logger')

const URL = `${process.env.POSTOFFICE_URL || 'https://apihom.correios.com.br'}/packet/v1/`

const headers = {
  "Content-Type": "application/json"
}

const mapPackage = package => {

  return {
    packageCode: package.customerControlCode,
    trackingNumber: package.trackingNumber
  }
}

const parseResponse = response => {
  logger.info('Mapping resource raw response')
  return {
    packages: response.packageResponseList.map(mapPackage)
  }
}

const request = async (token, event) => {
  try {
    const params = {
      "packageList": [JSON.parse(event.Records[0].body)]
    }

    const url = `${URL}packages`

    logger.info('Starting HTTP request to POST packet/v1/packages')

    const request = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { ...headers, Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(parseResponse)
    return request
  } catch (err) {
    logger.error('Application excepted with: ', err)
  }
}

module.exports = request