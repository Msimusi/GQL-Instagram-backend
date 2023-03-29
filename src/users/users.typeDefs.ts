import gql from "graphql-tag";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    password: String
    createdAt: String!
    updatedAt: String!
  }

  type Mutation {
    createAcount(
      firstName: String!
      lastName: String
      userName: String!
      email: String!
      password: String!
    ): User
  }
  type Query {
    seeProfile(username: String): User
  }
`;
