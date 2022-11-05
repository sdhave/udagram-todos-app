"use strict"

const { PostsAccess } = require("./dataLayer")

const postsAccess = new PostsAccess()

async function getAllPosts() {
    return postsAcess.getAllPosts()
}

module.exports = { getAllPosts }
