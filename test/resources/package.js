const test = require('ava')
const { v4: uuidv4 } = require('uuid');

const initCommunication = require('../../src/resources/client')
const { requestPackage } = require('../../src/resources')

test('Handle package event', async t => {

  const event = {
    "Records": [
      {
        "messageId": uuidv4(),
        "receiptHandle": "MessageReceiptHandle",
        "body": "{\"customerControlCode\":\"ESY2021020738555\",\"senderName\":\"Sinerlog USA\",\"senderAddress\":\"NW 25ST\",\"senderAddressNumber\":12950,\"senderAddressComplement\":\"\",\"senderZipCode\":\"33182\",\"senderCityName\":\"Miami\",\"senderState\":\"FL\",\"senderCountryCode\":\"CN\",\"senderEmail\":\"info@sinerlogusa.com\",\"senderWebsite\":\"www.sinerlogusa.com\",\"recipientName\":\"John Doe\",\"recipientDocumentType\":\"CPF\",\"recipientDocumentNumber\":\"77439893050\",\"recipientAddress\":\"Rua Artur Malaquias\",\"recipientAddressNumber\":\"350ANDAR 2\",\"recipientAddressComplement\":\"Centro\",\"recipientCityName\":\"Manacapuru\",\"recipientState\":\"SP\",\"recipientZipCode\":\"17270001\",\"recipientEmail\":\"\",\"recipientPhoneNumber\":\"\",\"totalWeight\":\"925\",\"packagingLength\":\"20\",\"packagingWidth\":\"15\",\"packagingHeight\":\"9\",\"distributionModality\":33162,\"taxPaymentMethod\":\"DDU\",\"currency\":\"R$\",\"freightPaidValue\":\"1.85\",\"insurancePaidValue\":0,\"items\":[{\"hsCode\":960110,\"description\":\"fan\",\"quantity\":2,\"value\":\"4.99\"}]}",
        "attributes": {
          "ApproximateReceiveCount": "1",
          "SentTimestamp": "1523232000000",
          "SenderId": "123456789012",
          "ApproximateFirstReceiveTimestamp": "1523232000001"
        },
        "messageAttributes": {},
        "md5OfBody": "{{{md5_of_body}}}",
        "eventSource": "aws:sqs",
        "eventSourceARN": "arn:aws:sqs:us-east-1:*:TestPackagequeue",
        "awsRegion": "us-east-1"
      }
    ]
  }

  const response = await initCommunication()
    .then(token => requestPackage(token, event))

    console.log(response)

  t.pass()
})