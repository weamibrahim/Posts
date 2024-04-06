const postMutations = `
 
    createPost(title: String, body: String, token: String): String
    updatePost(postId: ID, title: String, body: String, token: String): String
    deletePost(token: String, postId: ID): String
    deletePosts(id: ID, token: String): String
  
`;

module.exports = postMutations;
