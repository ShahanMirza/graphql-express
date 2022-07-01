const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('./db');
//check port in env file
let port = process.env.PORT;
   if (port == null || port == "") {
   port = 9000;
}
const app = express();
//file system
const host = '0.0.0.0';
const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolvers')
//
const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs, resolvers})

app.use(cors(), bodyParser.json());
//test commment
const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

app.listen(
   port, host,() => console.info(
      `Server started on port ${port}`
   )
);