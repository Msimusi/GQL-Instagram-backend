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
    follower: [User]
    bio: String
    avatar: String
  }
`;
