import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): User!
    login(username: String!, password: String!): LoginResult!
  }
`;
