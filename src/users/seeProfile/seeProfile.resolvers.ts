import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    users: (_, __, { client }) =>
      client.user.findMany({ select: { username: true } }),
    seeProfile: protectResolver((_, { username }, { client }) =>
      client.user.findUnique({ where: { username } })
    ),
  },
};

export default resolvers;
