//import * as AWS from 'aws-sdk'
const AWS  = require("aws-sdk")

const docClient = new AWS.DynamoDB.DocumentClient()

module.exports = docClient
