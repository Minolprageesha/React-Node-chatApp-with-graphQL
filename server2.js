import jwt from 'jsonwebtoken'
import resolvers from './resolvers.js';
import typeDefs from './typeDefs.js';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
const port = process.env.PORT || 4000
// create express and HTTP server
const app = express();

const context =({req})=>{
      const {authorization} = req.headers
      if(authorization){
       const {userId} = jwt.verify(authorization,process.env.JWT_SECRET)
       return {userId}
      }
    }

const schema = makeExecutableSchema({typeDefs,resolvers})

const apolloServer = new ApolloServer({schema,context});

await apolloServer.start()
apolloServer.applyMiddleware({ app,path:'/graphql' });

const server = app.listen(port,() =>{
  const wsServer = new WebSocketServer({
    server,
    path: '/graphql',
  });
  useServer({schema},wsServer);

  console.log(`Apollo and subscribtion server is up`);
});


