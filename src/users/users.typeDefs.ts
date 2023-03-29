import gql from "graphql-tag";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    password: String
    createdAt: String!
    updatedAt: String!
  }
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }

  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): User!
    login(username: String!, password: String!): LoginResult!
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
    ): EditProfileResult!
  }
  type Query {
    users: [User!]!
    seeProfile(username: String!): User
  }
`;
