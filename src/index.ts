import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from '../mongodb';
import { resolvers } from './resolvers';
import { createContext } from './context';
import schema from './schema.graphql';
import { makeExecutableSchema } from '@graphql-tools/schema'; 

const app = express();
const PORT = process.env.PORT || 4000;

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

app.use(
  '/graphql',
  graphqlHTTP((req, res) => ({
    schema: executableSchema,
    rootValue: resolvers,
    graphiql: true, // Enable GraphiQL for testing
    context: createContext(mongoose.model('Product', require('./models/productModel').default),
                           mongoose.model('Producer', require('./models/producerModel').default)),
  }))
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
