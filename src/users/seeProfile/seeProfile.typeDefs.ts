import { gql } from "graphql-tag";

export default gql`
  type Query {
    users: [User!]!
    seeProfile(username: String!): User
  }
`;
