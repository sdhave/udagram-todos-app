//import * as AWS from 'aws-sdk'
const { * as AWS } = require("aws-sdk")

const docClient = new AWS.DynamoDB.DocumentClient()

module.exports = docClient
