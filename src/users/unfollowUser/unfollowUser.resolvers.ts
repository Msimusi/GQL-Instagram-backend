import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectResolver(
      async (_, { username }, { loggedInUser, client }) => {
        const selfUnfollow = username === loggedInUser.username;
        if (selfUnfollow) {
          return { ok: false, error: "You are trying to unfollow youself." };
        }

        const checkFollowing = await client.user
          .findUnique({ where: { id: loggedInUser.id } })
          .following({ where: { username } });

        if (!checkFollowing || checkFollowing.length === 0) {
          return { ok: false, error: "You are not following the User." };
        }

        // const followingList = await client.user
        //   .findUnique({ where: { id: loggedInUser.id } })
        //   .following({ select: { username: true } });

        // if (!followingList.map((value) => value.username).includes(username)) {
        //   return { ok: false, error: "You are not following the User." };
        // }

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
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                username,
              },
            },
          },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
