import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectResolver(
      async (_, { username }, { loggedInUser, client }) => {
        const selfFollow = username === loggedInUser.username;
        if (selfFollow) {
          return { ok: false, error: "You are trying to follow youself." };
        }
        const usernameExist = await client.user.findUnique({
          where: { username },
          select: { username: true },
        });
        if (!usernameExist) {
          return {
            ok: false,
            error: "The User does not exist.",
          };
        }

        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: {
              connect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
