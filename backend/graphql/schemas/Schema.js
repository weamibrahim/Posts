const { buildSchema } = require('graphql');
const postMutations = require('../mutation/postMutation');
const commentMutations = require('../mutation/commentMutation');

const userMutations = `
  userCreate(name: String, email: String, password: String): String
  login(email: String, password: String): AuthPayload
  updateUser(token: String , id: ID, name: String, email: String): String
`;

const schema = buildSchema(`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    createdAt: String
  }
  
  type AuthPayload {
    token: String
    user: User
    message: String
  }
  
  type Post {
    _id: ID
    userId: User
    title: String
    body: String
    postId: ID
    
  }
  
  type Comment {
    _id: ID
    body: String
    postId: ID
    userId: User
  }

 

  type Query {
    hello: String
    usersGet: [User]
    userGet(id: ID): User
    postsGet(token: String): [Post]
    postsGetByUserId(id: ID): [Post]
    postGet(id: ID): Post
    commentsGet(postId: ID): [Comment]
    commentGet(id: ID): Comment
  }

  type Mutation {
    ${userMutations}
    ${postMutations}
    ${commentMutations}
  }
`);

module.exports = schema;
