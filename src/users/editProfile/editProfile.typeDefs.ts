import gql from "graphql-tag";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      bio: String
    ): EditProfileResult!
  }
`;