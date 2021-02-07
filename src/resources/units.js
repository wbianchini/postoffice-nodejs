const fetch = require('node-fetch')
const logger = require('../lib/logger')

const URL = `${process.env.POSTOFFICE_URL || 'https://apihom.correios.com.br'}/packet/v1/`

const headers = {
  "Content-Type": "application/json"
}

const request = async token => {
  try {
    const params = {
      "dispatchNumber": 958,
      "originCountry": "US",
      "originOperatorName": "SKYG",
      "destinationOperatorName": "SAOD",
      "postalCategoryCode": "A",
      "serviceSubclassCode": "NX",
      "unitList": [
        {
          "sequence": 1,
          "unitType": 1,
          "trackingNumbers": ["NX001985465BR"]
        }]
    }

    const url = `${URL}units`

    logger.info('Starting HTTP request to POST packet/v1/units')

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

module.exports = request