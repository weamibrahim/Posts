const commentMutations = `

    createComment(body: String, token: String, postId: ID): String
    updateComment(commentId: ID, body: String, token: String): String
    deleteComment(token: String, commentId: ID): String

`;

module.exports = commentMutations;
