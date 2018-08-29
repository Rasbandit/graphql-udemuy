const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');

const port = 3050;

const app = express();

app.use(cors());

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Ship docked at port: ${port}`);
});
