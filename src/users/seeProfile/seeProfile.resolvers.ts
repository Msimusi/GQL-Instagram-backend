import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    users: (_, __, { client }) =>
      client.user.findMany({ select: { username: true } }),
    seeProfile: (_, { username }, { client }) =>
      client.user.findUnique({
        where: { username },
        include: {
          following: true,
          followers: true,
        },
      }),
  },
};

export default resolvers;
