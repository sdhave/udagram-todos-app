const db = require("./db")
const uuid = require('uuid')

const getPosts = async (event) => {
  // Setting the status code
  const response = { statusCode: 200 }

  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME
    }
    // Adding the new item to the database
    const { Items } = await db.scan(params).promise()
    // Response for success
    response.body = JSON.stringify({
      message: "Successfully Executed",
      data: Items
    })

  } catch (e) {
    console.error(e)
    // Resetting status code for failure
    response.statusCode = 500
    // Response body for failure
    response.body = JSON.stringify({
      message: "Failed to Retrieved Data",
      errorMsg: e.message,
      errorStack: e.stack
    })
  }

  return response;
}

const createPost = async (event) => {
  // Setting the success status code
  const response = { statusCode: 200 }

  try {
    // Generate a unique ID
    const id = uuid.v4()
    // Get the rest of the data
    const body = JSON.parse(event.body)
    // Create the new item
    const newItem = {
      postId: id,
      ...body
    }
    // Parameters for adding item to db
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: newItem
    }
    // Adding the new item to the database
    await db.put(params).promise()
    // Response body for success
    response.body = JSON.stringify({
      message: "Successfully Created Post",
      newItem
    })

  } catch (e) {
    console.error(e)
    // Resetting the status code for
    response.statusCode = 500
    // Response body for failed
    response.body = JSON.stringify({
      message: "Failed to Create Post",
      errorMsg: e.message,
      errorStack: e.stack
    })
  }

  return response;
}

const deletePost = async (event) => {
  // Setting the status code
  const response = { statusCode: 200 }

  try {
    // Parameters for deleting item
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: { postId: event.pathParameters.postId }
    }
    // Deleting the item for db
    const deletedItem = await db.delete(params).promise()
    // Response body for success deletion
    response.body = JSON.stringify({
      message: "Successfully Deleted",
      data: deletedItem
    })

  } catch (e) {
    console.error(e)
    // Resetting the status code
    response.statusCode = 500
    // Response body for failures
    response.body = JSON.stringify({
      message: "Failed to Delete Data",
      errorMsg: e.message,
      errorStack: e.stack
    })
  }

  return response;
}

const updatePost = async (event) => {
  // Setting the success status code
  const response = { statusCode: 200 }

  try {
    // Get the rest of the data
    const body = JSON.parse(event.body)
    // Get post id from Parameters
    const postId = event.pathParameters.postId
    // Parameters for adding item to db
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: postId,
      Item: { postId, ...body }
    }
    // Adding the new item to the database
    await db.put(params).promise()
    // Response body for success
    response.body = JSON.stringify({
      message: "Successfully Updated Post",
    })

  } catch (e) {
    console.error(e)
    // Resetting the status code for
    response.statusCode = 500
    // Response body for failed
    response.body = JSON.stringify({
      message: "Failed to Update Post",
      errorMsg: e.message,
      errorStack: e.stack
    })
  }

  return response;
}

module.exports = { getPosts, createPost, deletePost, updatePost }
