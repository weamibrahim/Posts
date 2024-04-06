// routes/index.js
const express = require('express');
const router = express.Router();
const { graphqlHTTP } = require('express-graphql');
const schema = require('../graphql/schemas/Schema');
const resolvers = require('../graphql/resolvers/Resolver');

router.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}));

module.exports = router;