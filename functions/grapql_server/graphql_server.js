const {ApolloServer, gql} = require('apollo-server-lambda');

const typeDefs=gql`
type Query {
    hello:String
}
`

const resolvers = {
    Query:{
        hello:()=>"HELLO WORLD"
    }
}

const server = ApolloServer({
    typeDefs,
    resolvers,
    playground:true,
    introspection:true
})