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
    following: [User]
    followers: [User]
    bio: String
    avatar: String
  }
`;
