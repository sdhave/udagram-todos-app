"use strict"

const AWS  = require("aws-sdk")

class PostsAccess {
  constructor(
    private docClient = new AWS.DynamoDB.DocumentClient(),
    private postsTable = process.env.DYNAMODB_TABLE_NAME){
  }

  async getAllPosts() {
    const params = { TableName: this.postsTable }
    const result = await this.docClient.scan(params).promise()
    return result.Items
  }
}

module.exports = { PostsAccess }
