const PostsAccess = require("./PostsAccess")

const postsAccess = new PostsAccess()

async function getAllPosts() {
    return postsAcess.getAllPosts()
}

module.exports = { getAllPosts }
