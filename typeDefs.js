import{gql} from 'apollo-server-express'

const typeDefs = gql`
type Query{
  users:[User]
  massagesByUser(receiverId:Int!):[Massage]
}

input UserInput{
  firstName:String!
  lastName:String!
  email:String!
  password:String!
}

input UserSigninInput{
  email:String!
  password:String!
}

type Token{
  token:String!
}

scalar Date

type Massage {
  id: ID!
  text: String!
  receiverId: Int!
  senderId: Int!
  createdAt: Date!
}

type Mutation {
    signupUser(userNew:UserInput!):User  
    signinUser(userSignin: UserSigninInput):Token
    createMassage(receiverId:Int!,text:String!):Massage
}

type User{
    id:ID!
    firstName:String!
    lastName:String!
    email:String!
    todos:[Todo]
}
type Todo{
    title:String!
    by:ID!
}

type Subscription{
  messageAdded:Massage
}

`
export default typeDefs