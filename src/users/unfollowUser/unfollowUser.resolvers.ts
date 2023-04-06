import { protectResolver } from "../users.utils";

export default {
  Mutation: {
    unfollowUser: protectResolver(
      async (_, { username }, { loggedInUser, client }) => {
        const selfUnfollow = username === loggedInUser.username;
        if (selfUnfollow) {
          return { ok: false, error: "You are trying to unfollow youself." };
        }

        const { following: followingList } = await client.user.findUnique({
          where: { id: loggedInUser.id },
          select: {
            following: {
              select: {
                username: true,
              },
            },
          },
        });

        if (!followingList.map((value) => value.username).includes(username)) {
          return { ok: false, error: "You are not following the User." };
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
