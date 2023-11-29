import {ApolloServer} from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import resolvers from './resolvers.js';
import typeDefs from './typeDefs.js';



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{
      const {authorization} = req.headers
      if(authorization){
       const {userId} = jwt.verify(authorization,process.env.JWT_SECRET)
       return {userId}
      }
    }
  });

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });

 