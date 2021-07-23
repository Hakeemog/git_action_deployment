const gql = require("graphql-tag");
const ApolloClient = require("apollo-client").ApolloClient;
const fetch = require("node-fetch");
const createHttpLink = require("apollo-link-http").createHttpLink;
const setContext = require("apollo-link-context").setContext;
const InMemoryCache = require("apollo-cache-inmemory").InMemoryCache;



const httpLink = createHttpLink({
  uri: "https://dev-hasura-backend.moove.africa/v1/graphql",
  fetch: fetch
});


const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

module.exports = {
    client
} 