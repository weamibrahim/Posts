
const postController = require('../../controllers/postContoller');
const commentController = require('../../controllers/commentController');
const userController = require('../../controllers/userController');
const resolvers = {

    hello: () => 'Hello world!',
    postsGet: ({token}) => postController.getPosts(token),
    postsGetByUserId:({id})=> postController.getPostsByUserId(id),
    postGet: ({ id }) => postController.getPostById(id),
    createPost: ({ title, body ,token}) => postController.createPost({title, body ,token}),
    updatePost: ({ postId, title, body,token }) => postController.updatePost({ postId, title, body,token }),
 
    deletePost: ({token, postId}) => postController.deletePost({token, postId}),
   // deletePosts: ({id,token}) => postController.deletePosts({id,token})




   
// ============================comment===========================


   commentsGet: ({postId}) => commentController.commentsGet(postId),
   commentGet: ({id}) => commentController.commentGet(id),



   createComment: ({body,token,postId}) => commentController.createComment({body,token,postId}),
   updateComment: ({commentId, body,token}) => commentController.updateComment({commentId, body,token}),
   deleteComment: ({commentId,token}) => commentController.deleteComment({commentId,token}),

//    ============================user==========================
   usersGet: userController.getUsers,
   userGet: ({ id }) => userController.getUserById(id),
  userCreate: ({ name, email , password}) => userController.createUser( {name, email,password}),
   login: ({ email, password }) => userController.loginUser({ email, password }),
   updateUser: ({ token,id, name, email }) => userController.updateUser({token,id, name, email}),


}
module.exports = resolvers